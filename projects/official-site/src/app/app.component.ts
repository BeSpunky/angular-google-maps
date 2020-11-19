import { Observable                      } from 'rxjs';
import { map, shareReplay                } from 'rxjs/operators';
import { Component                       } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { Topics } from './topics/all';

export const WikiUrl   : string = 'https://bs-angular-g-maps.web.app/docs/index.html';
export const RepoUrl   : string = 'https://www.github.com/BeSpunky/angular-google-maps';
export const PackageUrl: string = 'https://www.npmjs.com/package/@bespunky/angular-google-maps';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    public readonly wikiUrl   : string = WikiUrl;
    public readonly repoUrl   : string = RepoUrl;
    public readonly packageUrl: string = PackageUrl;

    public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    public readonly topics = Topics;

    constructor(private breakpointObserver: BreakpointObserver) { }
}
