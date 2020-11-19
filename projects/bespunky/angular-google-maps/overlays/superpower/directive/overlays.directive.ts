import { Directive, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { GoogleMapComponent } from '@bespunky/angular-google-maps/core';
import { OverlaysSuperpower } from '../services/overlays-superpower.service';

/**
 * Reads the OverlaysSuperpower from the map component and outputs it to the given variable for programmatic control.
 * Two way binding syntax must be used for the extraction to work automatically.
 * Not that setting the value will have no effect whatsoever.
 * 
 * The `GoogleMapsOverlaysModule` must be imported for this directive to work.
 * 
 * @example
 * ```html
 * <bs-google-maps [(overlays)]="myOverlaysVariable">...</bs-google-maps>
 * ```
 *
 * @export
 * @class OverlaysDirective
 * @implements {OnInit}
 */
@Directive({
    selector: 'bs-google-map[overlays]',
    exportAs: 'overlays'
})
export class OverlaysDirective implements OnInit
{
    private power: OverlaysSuperpower;

    /**
     * The overlays power instantiated for the map.
     *
     * @readonly
     * @type {OverlaysSuperpower}
     */
    @Input () public get overlays(): OverlaysSuperpower { return this.power; }
    /**
     * Emits when the overlays power changed. This only happens when the map is instantiated.
     *
     * @type {EventEmitter<OverlaysSuperpower>}
     */
    @Output() public overlaysChange: EventEmitter<OverlaysSuperpower> = new EventEmitter();

    constructor(mapComponent: GoogleMapComponent)
    {
        this.power = mapComponent.wrapper.superpowers.use(OverlaysSuperpower);
    }

    // 
    /**
     *
     *
     */
    // public set overlays(noEffect: OverlaysSuperpower) { }

    /**
     * Waits for change detection cicle to end, then emits the superpower.
     */
    ngOnInit()
    {
        // To avoid the ExpressionChangedAfterItWasCheckedError, emission is done after angular finishes its detection cycle
        setTimeout(() => this.overlaysChange.emit(this.overlays), 0);
    }
}
