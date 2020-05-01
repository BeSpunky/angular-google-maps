import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { GoogleMapsApiService } from '@bespunky/angular-google-maps/core';

@Directive({
    selector: '[bsSafe]'
})
export class SafeDirective implements OnInit
{
    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private api: GoogleMapsApiService) { }

    ngOnInit()
    {
        this.api.whenReady.then(() => this.viewContainerRef.createEmbeddedView(this.templateRef));
    }
}