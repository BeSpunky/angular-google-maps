import { ElementRef  } from '@angular/core';
import { DocumentRef } from '@bespunky/angular-zen/core';

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
