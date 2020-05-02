import { ElementRef       } from '@angular/core';
import { DocumentRef      } from '@bespunky/angular-zen/core';
import { UniversalService } from '@bespunky/angular-zen/universal';

export function createAndAppendMapElement(parent: ElementRef, document: DocumentRef, universal: UniversalService): HTMLElement
{
    if (!universal.isPlatformBrowser) return null; // TODO: Test with Angular Universal app and see if this doesn't break the chain of contained directives

    // Create a container div for the map
    const mapElement = document.nativeDocument.createElement('div');
    // Mark it with a class for external css styling
    mapElement.className = 'google-map';
    
    // Add it to the current component template
    parent.nativeElement.appendChild(mapElement);
}
