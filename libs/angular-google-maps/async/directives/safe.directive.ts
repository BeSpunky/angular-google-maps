import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { GoogleMapsApiService } from '@bespunky/angular-google-maps/core';

/**
 * Makes sure that the element it is placed on only gets rendered once Google Maps API has fully loaded.
 *
 * @export
 * @class SafeDirective
 * @implements {OnInit}
 */
@Directive({
    selector: '[bsSafe]'
})
export class SafeDirective implements OnInit
{
    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private api: GoogleMapsApiService) { }

    /**
     * Waits for maps API to load, then renderes the element.
     *
     */
    ngOnInit()
    {
        this.api.whenReady.then(() => this.viewContainerRef.createEmbeddedView(this.templateRef));
    }
}