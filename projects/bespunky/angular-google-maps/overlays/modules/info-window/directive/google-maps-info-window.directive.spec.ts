import { ComponentFixture } from '@angular/core/testing';
import { Component        } from '@angular/core';

import { configureGoogleMapsTestingModule                                                                                                                              } from '@bespunky/angular-google-maps/testing';
import { createLifecycleTestingHostComponentTemplate, LifecycleComponentTestHost                                                                                       } from '@bespunky/angular-google-maps/core/testing';
import { MockMouseEventsEmitter                                                                                                                                        } from '@bespunky/angular-google-maps/overlays/testing';
import { GoogleMapsComponentApiService                                                                                                                                 } from '@bespunky/angular-google-maps/core';
import { GoogleMapsInfoWindowDirective, GoogleMapsOverlaysModule, GoogleMapsInfoWindow, GoogleMapsInfoWindowFactoryProvider, NativeGoogleMapsInfoWindowFactoryProvider } from '@bespunky/angular-google-maps/overlays';

/**
 * -- NOTE --
 * Events hooking and property delegation are not tested in components deriving from `GoogleMapsComponentBase`.
 * The appropriate tests are already done by `GoogleMapsComponentBase` and `GoogleMapsComponentApiService`/
 * 
 * @see `google-maps-internal-api.service.spec.ts` For testing of the hooking and delegation mechanisms.
 * @see `google-maps-component-base.spec.ts` For testing of the integration between the component and the internal API service.
 */
describe('GoogleMapsInfoWindowDirective', () =>
{
    let hostFixture  : ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let componentApi: GoogleMapsComponentApiService;
    let directive    : GoogleMapsInfoWindowDirective;
    let infoWindow   : GoogleMapsInfoWindow;

    beforeEach(async () =>
    {
        ({ fixture: hostFixture, component: hostComponent, componentApi } = await configureGoogleMapsTestingModule({
            componentType: TestHostComponent,
            customize: def =>
            {
                def.imports.push(GoogleMapsOverlaysModule);
                def.providers = [GoogleMapsInfoWindowFactoryProvider, NativeGoogleMapsInfoWindowFactoryProvider]
            }
        }));
        
        hostFixture.detectChanges();

        directive  = hostComponent.testedComponent as GoogleMapsInfoWindowDirective;
        infoWindow = directive.wrapper as GoogleMapsInfoWindow;
    });

    function getContent(): HTMLElement
    {
        const content = infoWindow.getContent();
        
        if (typeof content === 'string')
        {
            const element = document.createElement('div');
            element.innerHTML = content;

            return element.firstChild as HTMLElement;
        }

        return content as HTMLElement;
    }

    it('should create an instance', () => expect(directive).toBeTruthy());

    it('should set a parent div.google-maps-info-window in the info window\'s content', () =>
    {
        const content = getContent();

        expect(content.tagName).toBe('DIV');
        expect(content.className).toBe('google-maps-info-window');
    });

    it('should set its child nodes as content for the info window', () =>
    {
        const content = getContent();

        expect(content.children.length).toBe(1);
        expect(content.firstChild.nodeName).toBe('DIV');
    });

    it('should observe child nodes and keep the content up to date', () =>
    {
        hostComponent.values.push(hostComponent.values.length);
        hostComponent.values.push(hostComponent.values.length);
        hostComponent.values.push(hostComponent.values.length);

        hostFixture.detectChanges();

        const content = getContent();

        expect(content.children.length).toBe(hostComponent.values.length);
    });

    it('should detach the emmitter from the info window when destroyed', () =>
    {
        infoWindow.setAttachedTo(new MockMouseEventsEmitter(componentApi, infoWindow));

        directive.ngOnDestroy();

        expect(infoWindow.getAttachedTo()).toBeFalsy();
    });
});

@Component({
    template: createLifecycleTestingHostComponentTemplate(
        `<bs-google-maps-info-window [position]="center" #testedComponent="infoWindow">
            <div *ngFor="let n of values">{{n}}</div>
        </bs-google-maps-info-window>`
    )
})
class TestHostComponent extends LifecycleComponentTestHost
{
    public values: number[] = [1];
}