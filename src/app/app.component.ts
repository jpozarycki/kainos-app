import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {environment} from '../environments/environment';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'kainos-app-new';

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            let bases = this.document.getElementsByTagName('base');
    
            if (bases.length > 0) {
                bases[0].setAttribute('href', environment.baseHref);
            }
        }
    }


 constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any) {}
}
