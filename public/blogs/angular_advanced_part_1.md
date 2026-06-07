# Advanced Angular Interview Questions (Part 1/3)

As a Senior Developer with 12+ years of experience, interviewers expect you to demonstrate deep architectural knowledge backed by actual code. Here are the first 5 advanced questions focusing on Architecture, Dependency Injection, and RxJS.

---

## 1. Change Detection & Zone.js Optimization
**Question:** How do you prevent UI freezing when handling hundreds of high-frequency real-time events?

**The Code Answer:**
You must use `ChangeDetectionStrategy.OnPush` and escape Angular's Zone for high-frequency events (like mouse movements or raw WebSockets) so you don't trigger global change detection unnecessarily.

```typescript
import { Component, NgZone, ElementRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-heavy-dashboard',
  template: `
    <div #chartContainer class="chart">
      Latest Value: {{ latestValue }}
    </div>
  `,
  // 1. Enforce OnPush so Angular only checks when Inputs change or manually triggered
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeavyDashboardComponent implements OnInit {
  latestValue = 0;

  constructor(
    private ngZone: NgZone, 
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // 2. Escape Angular's Zone!
    // Normally, EVERY mousemove event triggers a global Angular change detection cycle.
    this.ngZone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('mousemove', (event: MouseEvent) => {
        // This heavy calculation runs without freezing the UI
        const calculatedValue = event.clientX * event.clientY;
        
        // 3. Only re-enter the Angular Zone when you actually need to update the DOM
        if (calculatedValue % 100 === 0) {
          this.ngZone.run(() => {
            this.latestValue = calculatedValue;
            this.cdr.markForCheck(); // Tell OnPush to update this specific component
          });
        }
      });
    });
  }
}
```

---

## 2. Hierarchical Dependency Injection
**Question:** What happens when a service is provided both at the `root` level and inside a Component's `providers` array? How does this affect memory?

**The Code Answer:**
Angular creates a **separate instance** of the service for the Component. When the component is destroyed, that specific instance is garbage collected (preventing memory leaks). 

```typescript
import { Injectable, Component, OnDestroy } from '@angular/core';

// 1. The Singleton (Root) Instance
@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  public data = 'Global';
}

// 2. The Localized Component Instance
@Component({
  selector: 'app-localized',
  template: `<p>Data: {{ state.data }}</p>`,
  // Providing it here overrides the 'root' instance for this component AND its children!
  providers: [GlobalStateService] 
})
export class LocalizedComponent implements OnDestroy {
  constructor(public state: GlobalStateService) {
    this.state.data = 'Localized'; // Does not affect the Global instance
  }

  ngOnDestroy() {
    // When this component dies, its localized GlobalStateService instance is destroyed.
    // This is a great pattern for isolated widget state!
  }
}
```

---

## 3. RxJS Higher Order Mapping Operators
**Question:** Explain the difference between `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap` in a real-world scenario.

**The Code Answer:**
```typescript
import { Component } from '@angular/core';
import { Subject, of } from 'rxjs';
import { switchMap, mergeMap, concatMap, exhaustMap, delay } from 'rxjs/operators';

@Component({ ... })
export class RxJsOperatorsComponent {
  saveAction$ = new Subject<string>();

  constructor() {
    // 1. switchMap: Cancels previous requests. Perfect for TYPEAHEAD SEARCH.
    // If user types 'A', then 'B', the 'A' search is cancelled.
    this.saveAction$.pipe(
      switchMap(data => this.fakeHttpSave(data))
    ).subscribe();

    // 2. mergeMap: Runs everything in parallel. Perfect for BULK UPLOADS.
    // If user uploads 5 files, all 5 HTTP requests run simultaneously.
    this.saveAction$.pipe(
      mergeMap(data => this.fakeHttpSave(data))
    ).subscribe();

    // 3. concatMap: Queues requests in order. Perfect for DB INSERTS.
    // It waits for request 1 to finish before starting request 2.
    this.saveAction$.pipe(
      concatMap(data => this.fakeHttpSave(data))
    ).subscribe();

    // 4. exhaustMap: Ignores new requests until current finishes. 
    // Perfect for SUBMIT BUTTONS (prevents double-clicking).
    this.saveAction$.pipe(
      exhaustMap(data => this.fakeHttpSave(data))
    ).subscribe();
  }

  fakeHttpSave(data: string) {
    return of(`${data} saved!`).pipe(delay(1000));
  }
}
```

---

## 4. Preventing RxJS Memory Leaks
**Question:** How do you guarantee you never introduce RxJS memory leaks?

**The Code Answer:**
In modern Angular (v16+), you should use `takeUntilDestroyed()`. Historically, we used a `Subject` mapped to `ngOnDestroy`.

```typescript
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  template: `<div>Check the console</div>`
})
export class TimerComponent implements OnInit {
  
  // 1. The Modern Way (Angular 16+)
  // We can inject DestroyRef directly.
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    interval(1000).pipe(
      // 2. This automatically unsubscribes when the component is destroyed!
      // No more manual ngOnDestroy logic required.
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(val => console.log('Tick:', val));
  }
}
```

---

## 5. Guards vs Resolvers
**Question:** What is the difference between a Route Guard and a Route Resolver?

**The Code Answer:**
Guards run *first* to block access. Resolvers run *second* to pre-fetch data so the UI doesn't render empty.

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, ResolveFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

// 1. The GUARD (Blocks Access)
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isLoggedIn()) {
    return true;
  }
  // Redirect to login if unauthorized
  return router.parseUrl('/login');
};

// 2. The RESOLVER (Pre-fetches Data)
export const userResolver: ResolveFn<any> = (route) => {
  const dataService = inject(DataService);
  const userId = route.paramMap.get('id');
  
  // The route transition will PAUSE until this HTTP request finishes.
  // The component won't render until the data is fully ready.
  return dataService.getUserData(userId);
};

// Route Configuration
const routes = [
  { 
    path: 'dashboard/:id', 
    component: DashboardComponent,
    canActivate: [authGuard],     // Runs first
    resolve: { user: userResolver } // Runs second
  }
];
```
