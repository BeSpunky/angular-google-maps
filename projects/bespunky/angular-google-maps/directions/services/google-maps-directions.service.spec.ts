import { TestBed } from '@angular/core/testing';

import { configureGoogleMapsTestingModule } from '@bespunky/angular-google-maps/testing';
import { GoogleMapsDirectionsService      } from '@bespunky/angular-google-maps/directions';

describe('GoogleMapsDirectionsService', () =>
{
    let service: GoogleMapsDirectionsService;

    beforeEach(() =>
    {
        configureGoogleMapsTestingModule();

        service = TestBed.inject(GoogleMapsDirectionsService);
    });

    describe('basically', () =>
    {    
        it('should be created', () => expect(service).toBeTruthy());
    });

    describe('calling `through()`', () =>
    {
        it('should return an observable that emits the results of a successfull directions request');
        it('should return an observable that errors with the error details from a failed directions request');
        it('should return an observable that runs the directions request outside angular');
        it('should error when less than 2 places are specified');
        it('should use the first provided place as the origin for the request');
        it('should use the last provided place as the destination for the request');
        it('should use every place between the first and last as waypoints for the request');
        it('should set a default driving mode when none is provided');
        it('should assign the provided options to the request');
    });
    
    describe('calling `route()`', () =>
    {
        it('should return an observable that emits the results of a successfull directions request');
        it('should return an observable that errors with the error details from a failed directions request');
        it('should return an observable that runs the directions request outside angular');
        it('should error when `from` is not specified');
        it('should error when `to` is not specified');
        it('should use `from` as the origin for the request');
        it('should use `to` as the destination for the request');
        it('should set a default driving mode when none is provided');
        it('should assign the provided options to the request');
    });

    describe('calling `throughFeed()`', () =>
    {
        it('should return a hot observable that emits the results of a successfull directions request for each change in `places` or `config`');
        it('should return a hot observable that errors with the error details from a failed directions request for each change in `places` or `config`');
        it('should return a hot observable that runs the directions request outside angular for each change in `places` or `config`');
        it('should error when less than 2 places are specified');
        it('should use the first provided place as the origin for the request');
        it('should use the last provided place as the destination for the request');
        it('should use every place between the first and last as waypoints for the request');
        it('should set a default driving mode when none is provided');
        it('should assign the provided options to the request');
    });

    describe('calling `routeFeed()`', () =>
    {
        it('should return an observable that emits the results of a successfull directions request for each change in `from`, `to` or `config`');
        it('should return an observable that errors with the error details from a failed directions request for each change in `from`, `to` or `config`');
        it('should return an observable that runs the directions request outside angular for each change in `from`, `to` or `config`');
        it('should error when `from` is not specified');
        it('should error when `to` is not specified');
        it('should use `from` as the origin for the request');
        it('should use `to` as the destination for the request');
        it('should set a default driving mode when none is provided');
        it('should assign the provided options to the request');
    });
});
