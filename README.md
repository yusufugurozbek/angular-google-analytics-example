# angular-google-analytics
Easy implementation Google Analytics tracking code for Angular 5. It is with Global Site Tag (gtag.js)!

**Don't forget to change GA_TRACKING_ID with your Google Analytics tracking ID.**

### Create Project 

```sh
ng new angular-google-analytics
```

### Implement tracking code into index.html

Don't forget to remove  ``` gtag('config', 'GA_TRACKING_ID'); ```

Insert below code after your ```<head>``` tag.

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  </script>
```

### Create script.js file

```javascript
export function googleAnalytics(url) {
  gtag('config', 'GA_TRACKING_ID', {'page_path': url});
}
```

### Create script.d.ts file

```typescript
export declare function googleAnalytics(url);
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
