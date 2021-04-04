import { ElementRef  } from '@angular/core';
import { DocumentRef } from '@bespunky/angular-zen/core';

/**
 * Creates `div.google-maps` element that will be passed to the native maps API for map rendering, and adds it as a child to the specified parent element.
 
 * @internal
 * @export
 * @param {ElementRef} parent The element to add the new map element to.
 * @param {DocumentRef} document The reference to the document.
 * @returns {ElementRef<HTMLElement>} A reference to the native element created for map rendering.
 */
export function createAndAppendMapElement(parent: ElementRef, document: DocumentRef): ElementRef<HTMLElement>
{
    // Create a container div for the map
    const mapElement = document.nativeDocument.createElement('div');
    // Mark it with a class for external css styling
    mapElement.className = 'google-map';
    
    // Add it to the current component template
    parent.nativeElement.appendChild(mapElement);

    return new ElementRef(mapElement);
}
