import { Component, ElementRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { SafeDirective } from './safe.directive';
import { GoogleMapsApiService } from './google-maps-api.service';
import { configureGoogleMapsTestingModule } from '../../testing/setup.spec';

describe('SafeDirective', () =>
{
    let fixture  : ComponentFixture<TestHost>;
    let api      : GoogleMapsApiService;
    let testHost : TestHost;
    
    beforeEach(async () =>
    {
        ({ fixture, api, component: testHost } = await configureGoogleMapsTestingModule({
            componentType: TestHost,
            customize: def => def.declarations.push(SafeDirective)
        }));
    });

    it('should render the element\'s template only when maps api is ready', () =>
    {
        expect(testHost.rendered).toBeFalsy();

        fixture.detectChanges();
        
        api.whenReady.then(() => expect(testHost.rendered).toBeTruthy());
    });
});

@Component({
    template: `<div id="safe-div" *bsSafe></div>`
})
class TestHost
{
    constructor(public element: ElementRef) { }
    
    public get rendered(): boolean
    {
        return !!this.element?.nativeElement?.querySelector('#safe-div');
    }
}