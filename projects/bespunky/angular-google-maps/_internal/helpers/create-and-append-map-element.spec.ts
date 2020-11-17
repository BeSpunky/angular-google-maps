import { ElementRef  } from '@angular/core';
import { DocumentRef } from '@bespunky/angular-zen/core';

import { createAndAppendMapElement } from "./create-and-append-map-element";

describe('createAndAppendMapElement', () =>
{
    it('should add a div.google-map to the parent', () =>
    {
        const parent = document.createElement('div');

        const child = createAndAppendMapElement(new ElementRef(parent), new DocumentRef(document));

        expect(child.nativeElement.nodeName).toBe('DIV');
        expect(child.nativeElement.className).toBe('google-map');
        expect(child.nativeElement.parentElement).toBe(parent);
    });
});