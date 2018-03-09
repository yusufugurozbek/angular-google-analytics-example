import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {googleAnalytics} from '../assets/script';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {
    this.router.events.filter(event => event instanceof NavigationStart).subscribe(event => {
      const url = event['url'];
      if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
        googleAnalytics(url);
      }
    });
  }
}
