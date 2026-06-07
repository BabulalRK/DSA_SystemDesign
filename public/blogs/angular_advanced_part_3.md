# Advanced Angular Interview Questions (Part 3/3)

Here are the final 5 advanced Angular questions focusing on Server-Side Rendering (SSR), State Management, and dynamic component loading.

---

## 11. Hydration & SSR
**Question:** What is "Non-Destructive Hydration" in Angular 16+?

**The Code Answer:**
Historically, Angular Server-Side Rendering (SSR) would draw the HTML on the server, but when the browser loaded, Angular would delete the entire DOM and rebuild it from scratch, causing a visible flicker. 

"Non-Destructive Hydration" reuses the exact DOM nodes rendered by the server and simply attaches JavaScript event listeners to them. 

You enable it in your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // This single line enables non-destructive hydration!
    // It drastically improves Largest Contentful Paint (LCP) and prevents flickering.
    provideClientHydration() 
  ]
};
```

---

## 12. State Management
**Question:** How do you implement global state management without using heavy libraries like NgRx?

**The Code Answer:**
For 80% of enterprise applications, NgRx (Redux) is overkill. You can build a highly performant, reactive state engine using an Angular Service and a `BehaviorSubject`.

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AppState {
  user: string | null;
  theme: 'light' | 'dark';
}

@Injectable({ providedIn: 'root' })
export class StateService {
  // 1. The Single Source of Truth (Private so nobody can mutate it directly)
  private state$ = new BehaviorSubject<AppState>({ user: null, theme: 'light' });

  // 2. Selectors (Public Observables for components to listen to)
  user$: Observable<string | null> = this.state$.pipe(map(s => s.user));
  theme$: Observable<string> = this.state$.pipe(map(s => s.theme));

  // 3. Actions (The only way to modify state)
  setUser(user: string) {
    const currentState = this.state$.getValue();
    // Emit a brand new immutable object
    this.state$.next({ ...currentState, user });
  }

  toggleTheme() {
    const currentState = this.state$.getValue();
    const newTheme = currentState.theme === 'light' ? 'dark' : 'light';
    this.state$.next({ ...currentState, theme: newTheme });
  }
}
```

---

## 13. Advanced Lazy Loading
**Question:** Lazy loading delays rendering when a user clicks a route. How do you implement a Custom Preloading Strategy to solve this based on network speed?

**The Code Answer:**
You can write a strategy that preloads the JavaScript bundles in the background, but *only* if the user is on a fast Wi-Fi connection.

```typescript
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Check if the user is on a slow 2G/3G connection or has 'Save Data' mode enabled
    const connection = (navigator as any).connection;
    
    if (connection) {
      if (connection.saveData || connection.effectiveType.includes('2g') || connection.effectiveType.includes('3g')) {
        console.log(`Slow network detected. Aborting preload for ${route.path}`);
        return of(null); // Do not preload
      }
    }

    // If on fast Wi-Fi, preload the module in the background!
    console.log(`Fast network detected. Preloading ${route.path}`);
    return load();
  }
}
```

---

## 14. Angular Elements (Web Components)
**Question:** How do you convert an Angular Component into a native Web Component that can be used inside a React or Vanilla JS application?

**The Code Answer:**
You use `@angular/elements` to compile the component down to a custom HTML element tag. This is heavily used in Micro-frontend architectures.

```typescript
import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { ChatWidgetComponent } from './chat-widget.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ChatWidgetComponent]
  // Note: NO bootstrap array! We bootstrap manually.
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    // 1. Wrap the Angular component into a Custom Element
    const chatElement = createCustomElement(ChatWidgetComponent, { injector: this.injector });
    
    // 2. Register it with the browser's native CustomElementRegistry
    customElements.define('custom-chat-widget', chatElement);
  }
}

// Usage in any HTML file, even outside Angular:
// <custom-chat-widget user-id="123"></custom-chat-widget>
```

---

## 15. Dynamic Component Loading
**Question:** How do you render a component dynamically at runtime if you don't know what component to load until the API returns JSON data?

**The Code Answer:**
You inject `ViewContainerRef` and use `createComponent()` to dynamically instantiate classes.

```typescript
import { Component, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { TextWidgetComponent } from './text-widget.component';
import { ImageWidgetComponent } from './image-widget.component';

@Component({
  selector: 'app-dynamic-dashboard',
  standalone: true,
  template: `
    <h2>Dynamic Dashboard</h2>
    <!-- The anchor point where we will inject the components -->
    <ng-container #dynamicHost></ng-container>
  `
})
export class DynamicDashboardComponent {
  // Grab a reference to the ng-container DOM element
  @ViewChild('dynamicHost', { read: ViewContainerRef }) host!: ViewContainerRef;

  renderWidgetFromServer(widgetType: 'text' | 'image') {
    // 1. Determine the class to load
    const componentClass = widgetType === 'text' ? TextWidgetComponent : ImageWidgetComponent;

    // 2. Clear any existing components
    this.host.clear();

    // 3. Dynamically instantiate and render the component!
    const componentRef = this.host.createComponent(componentClass);

    // 4. You can even pass @Input data to it dynamically
    componentRef.instance.data = "Loaded from JSON!";
  }
}
```
