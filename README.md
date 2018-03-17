# angular-google-analytics
Easy implementation Google Analytics tracking code for Angular 5. It is with Global Site Tag (gtag.js)!

**Don't forget to change GA_TRACKING_ID with your Google Analytics tracking ID.**

### Create Project 

```sh
ng new angular-google-analytics
```

### Create script.js file

```javascript
import {environment} from "../environments/environment";

export function googleAnalyticsHeadScripts(){
  const head = document.getElementsByTagName('head')[0];

  const googleAnalyticsFirstScript = document.createElement('script');
  googleAnalyticsFirstScript.async = true;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.google_analytics_code;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = '    window.dataLayer = window.dataLayer || [];\n' +
    '    function gtag(){dataLayer.push(arguments);}\n' +
    '    gtag(\'js\', new Date());\n' +
    '\n' +
    '    gtag(\'config\', \'' + environment.google_analytics_code + '\');';

  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  head.insertBefore(googleAnalyticsFirstScript, head.firstChild);
}

export function googleAnalytics(url) {
  gtag('config', environment.google_analytics_code, {'page_path': url});
}
```

### Create script.d.ts file

```typescript
export declare function googleAnalyticsHeadScripts();
export declare function googleAnalytics(url);
```

### Update your environment.ts (environment.prod.ts for production) file and insert google_analytics_code variable

```typescript
google_analytics_code: 'GA_TRACKING_ID'
```

### Update main.ts file

```typescript
import {googleAnalyticsHeadScripts} from './assets/script';
...
if (environment.production) {
  enableProdMode();
}
...
googleAnalyticsHeadScripts();

platformBrowserDynamic...
```

### Update AppComponent

```typescript
import {NavigationStart, Router} from '@angular/router';
import {googleAnalytics} from '../assets/script';
import 'rxjs/add/operator/filter';

...

  constructor(private router: Router) {
    this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
      const url = event['url'];
      if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
        googleAnalytics(url);
      }
    });
  }
```

### Create TestPageComponent (Optional) 

```sh
ng generate component test-page
```

### Update AppModule

```typescript
import {RouterModule, Routes} from '@angular/router';
import {TestPageComponent} from './test-page/test-page.component';

...

  const appRoutes: Routes = [
    {path: 'test-page', component: TestPageComponent}
  ];
  
...

  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
```

Now you can test it!
