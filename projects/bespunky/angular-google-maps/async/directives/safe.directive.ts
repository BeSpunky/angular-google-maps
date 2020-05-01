import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { GoogleMapsApiService } from './google-maps-api.service';

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