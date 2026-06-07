# Advanced Angular Interview Questions (Part 2/3)

Here are the next 5 advanced Angular questions focusing on Reactivity (Signals), Component Architecture, and Interceptors.

---

## 6. Signals vs RxJS
**Question:** How do Signals differ from RxJS, and when should you use them?

**The Code Answer:**
Signals are for **synchronous state** and allow Angular to update the DOM without Zone.js. RxJS is for **asynchronous streams** (HTTP/Events).

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <!-- The DOM updates instantly when Signals change, no Zone.js required! -->
    <p>Quantity: {{ quantity() }}</p>
    <p>Price: ${{ price() }}</p>
    <p>Total: ${{ total() }}</p>
    <button (click)="increment()">Add Item</button>
  `
})
export class ShoppingCartComponent {
  // 1. Writable Signals (State)
  quantity = signal(1);
  price = signal(10);

  // 2. Computed Signals (Derived State)
  // This automatically recalculates ONLY when quantity or price changes.
  // It completely replaces complex RxJS combineLatest() logic!
  total = computed(() => this.quantity() * this.price());

  constructor() {
    // 3. Effects (Side Effects)
    effect(() => {
      console.log(`The new total is ${this.total()}`);
    });
  }

  increment() {
    // Updating a signal
    this.quantity.update(q => q + 1);
  }
}
```

---

## 7. Standalone Components
**Question:** What architectural problem do Standalone Components solve?

**The Code Answer:**
They completely eliminate `NgModules`. Historically, modules created "invisible" dependency chains. Standalone components declare exactly what they need directly, making the code vastly easier to tree-shake and lazy-load.

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-standalone-hero',
  // 1. Mark as standalone
  standalone: true,
  // 2. Directly import EXACTLY what this component needs. No more bloated SharedModules!
  imports: [CommonModule, MatButtonModule, RouterModule],
  template: `
    <section>
      <h1>Welcome</h1>
      <button mat-button routerLink="/home">Enter</button>
    </section>
  `
})
export class StandaloneHeroComponent {}
```

---

## 8. Structural Directives Under the Hood
**Question:** How does `*ngIf` actually manipulate the DOM?

**The Code Answer:**
The `*` syntax is syntactic sugar. Angular wraps the element in an `<ng-template>` and uses `ViewContainerRef` to manually render or destroy the template.

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomIf]',
  standalone: true
})
export class CustomIfDirective {
  private hasView = false;

  // We inject the Template blueprint and the DOM Container where it belongs
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appCustomIf(condition: boolean) {
    if (condition && !this.hasView) {
      // Create the DOM element from the blueprint
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      // Completely destroy the DOM element to free memory
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```
*Usage:* `<div *appCustomIf="isReady">Loaded!</div>`

---

## 9. Content Projection & ngTemplateOutlet
**Question:** What is the difference between `<ng-content>` and `ngTemplateOutlet`?

**The Code Answer:**
`<ng-content>` is static. The parent renders the content once. `ngTemplateOutlet` is dynamic. The parent provides a blueprint (`<ng-template>`), and the child decides *how* and *when* to render it, passing variables back up!

```typescript
import { Component, Input, TemplateRef } from '@angular/core';

// THE CHILD COMPONENT
@Component({
  selector: 'app-list',
  standalone: true,
  template: `
    <ul>
      <li *ngFor="let item of items">
        <!-- The Child renders the Parent's template dynamically, passing context! -->
        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }">
        </ng-container>
      </li>
    </ul>
  `
})
export class ListComponent {
  @Input() items: string[] = [];
  @Input() itemTemplate!: TemplateRef<any>; // Receives the blueprint
}

// THE PARENT COMPONENT
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ListComponent],
  template: `
    <app-list [items]="fruits" [itemTemplate]="customLayout"></app-list>

    <!-- The Blueprint. 'let-fruit' captures the $implicit context passed by the child -->
    <ng-template #customLayout let-fruit>
      <strong>Fruit:</strong> {{ fruit | uppercase }}
    </ng-template>
  `
})
export class ParentComponent {
  fruits = ['Apple', 'Banana', 'Cherry'];
}
```

---

## 10. HTTP Interceptor Architecture
**Question:** How do you architect an Interceptor to handle a 401 Unauthorized error, refresh the token, and retry the failed request?

**The Code Answer:**
You use `catchError` to trap the 401, call your refresh logic, and then use `req.clone()` to retry the original request with the new token.

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 1. Attach current token
    let authReq = this.addToken(req, this.authService.getToken());

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // 2. If 401 Unauthorized...
        if (error.status === 401) {
          // 3. Call the refresh token API
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              // 4. Clone the original request with the NEW token and retry!
              const retriedReq = this.addToken(req, newToken);
              return next.handle(retriedReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
}
```
