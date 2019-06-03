import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapMarkerComponent } from './google-map-marker.component';

describe('GoogleMapMarkerComponent', () =>
{
    let component: GoogleMapMarkerComponent;
    let fixture: ComponentFixture<GoogleMapMarkerComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [GoogleMapMarkerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(GoogleMapMarkerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
