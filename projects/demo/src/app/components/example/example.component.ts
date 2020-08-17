import { Component                     } from '@angular/core';
import { ActivatedRoute                } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Example } from '../../types/example';

@Component({
    selector   : 'demo-example',
    templateUrl: './example.component.html',
    styleUrls  : ['./example.component.scss']
})
export class ExampleComponent
{
    public example: Example;
    public loaded : boolean = false;
    
    constructor(private sanitizer: DomSanitizer, route: ActivatedRoute)
    {
        this.example = route.snapshot.data as Example;
    }

    public safe(url: string): SafeResourceUrl
    {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
