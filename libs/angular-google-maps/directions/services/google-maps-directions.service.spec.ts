import { Observable, of, PartialObserver, Subject } from 'rxjs';
import { map, switchMap, take, tap                } from 'rxjs/operators';
import { TestBed                                  } from '@angular/core/testing';

import { configureGoogleMapsTestingModule                                                                                                               } from '@bespunky/angular-google-maps/testing';
import { directionsResult, expectPlace, literalCoordPlace, nativePlace, producePlaceSpecs, stringPlace                                                  } from '@bespunky/angular-google-maps/directions/testing';
import { GoogleMapsDirectionsService, DirectionsCallback, DirectionsTransformService, DirectionsPlace, DirectionsRequestConfig, NativeDirectionsService } from '@bespunky/angular-google-maps/directions';

describe('GoogleMapsDirectionsService', () =>
{
    let service                   : GoogleMapsDirectionsService;
    let transform                 : DirectionsTransformService;
    let runOutsideAngularWhenReady: jest.SpyInstance;
    let native                    : { route: jest.SpyInstance };
    let nativeRouteFn             : jest.SpyInstance;

    const through = [literalCoordPlace, stringPlace, nativePlace];

    function testDirectionsRequest(request: () => Observable<google.maps.DirectionsResult>, fakeResult: google.maps.DirectionsResult, fakeStatus: google.maps.DirectionsStatus, observer: PartialObserver<google.maps.DirectionsResult>)
    {
        return (done: DoneFn) =>
        {
            nativeRouteFn.mockImplementation((_, handler: DirectionsCallback) => handler(fakeResult, fakeStatus));

            // Wrap the observer to automatically call the done() function
            const expectations: PartialObserver<google.maps.DirectionsResult> = {
                next    : result  => observer.next(result),
                error   : message => { observer.error ? observer.error(message) : 0; done(); },
                complete: done
            };
            
            try
            {
                request().subscribe(expectations);
            }
            catch (error)
            {
                expectations.error(error);
            }
        };
    }
    
    function testSuccessfulRequest(request: () => Observable<google.maps.DirectionsResult>, runExpectations?: (result: google.maps.DirectionsResult) => void)
    {
        return testDirectionsRequest(request, directionsResult, google.maps.DirectionsStatus.OK, {
            next: result =>
            {
                expect(result).toBe(directionsResult);

                if (runExpectations) runExpectations(result);
            }
        });
    }

    function testFailedRequest(request: () => Observable<google.maps.DirectionsResult>, expectedMessage: string | RegExp, runExpectations?: (message: string) => void)
    {
        return testDirectionsRequest(request, null, google.maps.DirectionsStatus.REQUEST_DENIED, {
            error: message =>
            {
                expect(message).toMatch(expectedMessage);

                if (runExpectations) runExpectations(message);
            }
        });
    }

    function testRequestData(request: () => Observable<google.maps.DirectionsResult>, runExpectations: (createdRequest: google.maps.DirectionsRequest) => void)
    {
        return () =>
        {
            request().subscribe();

            const routingCall    = nativeRouteFn.mock.calls.slice(-1);
            const createdRequest = routingCall[0] as google.maps.DirectionsRequest;
            
            runExpectations(createdRequest);
        };
    }

    beforeEach(async () =>
    {
        native        = { route: jest.fn() };
        nativeRouteFn = native['route'];

        ({ spies: { runOutsideAngularWhenReady } } = await configureGoogleMapsTestingModule({
            customize: def => def.providers.push({ provide: NativeDirectionsService, useValue: native })
        }));

        service   = TestBed.inject(GoogleMapsDirectionsService);
        transform = TestBed.inject(DirectionsTransformService);
    });

    describe('basically', () =>
    {    
        it('should be created', () => expect(service).toBeTruthy());
    });

    describe('calling `through()`', () =>
    {
        it('should return an observable that emits the results of a successfull directions request', testSuccessfulRequest(() => service.through(through)));
        
        it('should return an observable that errors with the error details from a failed directions request', testFailedRequest(() => service.through(through), /[Ff]ailed to retrieve directions/));

        it('should return an observable that runs the directions request outside angular when api is ready', testSuccessfulRequest(() =>
        {
            return of(0).pipe(
                tap(_ => expect(runOutsideAngularWhenReady).not.toHaveBeenCalled()),
                switchMap(_ => service.through(through))
            );
        }, () =>
        {
            expect(nativeRouteFn).toHaveBeenCalledTimes(1);
            expect(runOutsideAngularWhenReady).toHaveBeenCalledTimes(1);
        }));

        it('should error when less than 2 places are specified', testFailedRequest(() => service.through(through.slice(0, 1)), /At least 2 places/));

        it('should set the directions request', testRequestData(
            () => service.through(through),
            createdRequest =>
            {
                expect(nativeRouteFn).toHaveBeenCalledTimes(1);
                expectPlace(createdRequest.origin, transform.toNativePlace(through[0]));
                expectPlace(createdRequest.destination, transform.toNativePlace(through.slice(-1)[0]));
                createdRequest.waypoints.forEach((waypoint, index) => expectPlace(waypoint, transform.toNativeWaypoint(through[index + 1])));
            }
        ));

        producePlaceSpecs('set the directions request', place => testRequestData(
            () => service.through([place, ...through]),
            createdRequest =>
            {
                expect(nativeRouteFn).toHaveBeenCalledTimes(1);
                expectPlace(createdRequest.origin, transform.toNativePlace(place));
                expectPlace(createdRequest.destination, transform.toNativePlace(through.slice(-1)[0]));
                createdRequest.waypoints.forEach((waypoint, index) => expectPlace(waypoint, transform.toNativeWaypoint(through[index])));
            }
        )());

        it('should set a default driving mode when none is provided', testRequestData(
            () => service.through(through),
            createdRequest => expect(createdRequest.travelMode in google.maps.TravelMode).toBeTruthy()
        ));

        it('should assign the provided options to the request', testRequestData(
            () => service.through(through, { avoidTolls: true, region: 'cool place'}),
            createdRequest =>
            {
                expect(createdRequest.avoidTolls).toBeTruthy();
                expect(createdRequest.region).toBe('cool place');
            }
        ));
    });
    
    describe('calling `route()`', () =>
    {
        it('should return an observable that emits the results of a successfull directions request', testSuccessfulRequest(() => service.route(through[0], through[1])));
        
        it('should return an observable that errors with the error details from a failed directions request', testFailedRequest(() => service.route(through[0], through[1]), /[Ff]ailed to retrieve directions/));

        it('should return an observable that runs the directions request outside angular when api is ready', testSuccessfulRequest(() =>
        {
            return of(0).pipe(
                tap(_ => expect(runOutsideAngularWhenReady).not.toHaveBeenCalled()),
                switchMap(_ => service.route(through[0], through[1]))
            );
        }, () =>
        {
            expect(nativeRouteFn).toHaveBeenCalledTimes(1);
            expect(runOutsideAngularWhenReady).toHaveBeenCalledTimes(1);
        }));

        it('should error when only `from` is specified', testFailedRequest(() => service.route(through[0], null), /must be specified/));
        it('should error when only `to` is specified'  , testFailedRequest(() => service.route(null, through[0]), /must be specified/));

        it('should set the directions request', testRequestData(
            () => service.route(through[0], through[1]),
            createdRequest =>
            {
                expect(nativeRouteFn).toHaveBeenCalledTimes(1);
                expectPlace(createdRequest.origin, transform.toNativePlace(through[0]));
                expectPlace(createdRequest.destination, transform.toNativePlace(through[1]));
                expect(createdRequest.waypoints).toEqual([]);
            }
        ));

        producePlaceSpecs('set the directions request', place => testRequestData(
            () => service.route(place, through[0]),
            createdRequest =>
            {
                expect(nativeRouteFn).toHaveBeenCalledTimes(1);
                expectPlace(createdRequest.origin, transform.toNativePlace(place));
                expectPlace(createdRequest.destination, transform.toNativePlace(through[0]));
                expect(createdRequest.waypoints).toEqual([]);
            }
        )());

        it('should set a default driving mode when none is provided', testRequestData(
            () => service.route(through[0], through[1]),
            createdRequest => expect(createdRequest.travelMode in google.maps.TravelMode).toBeTruthy()
        ));

        it('should assign the provided options to the request', testRequestData(
            () => service.route(through[0], through[1], { avoidTolls: true, region: 'cool place'}),
            createdRequest =>
            {
                expect(createdRequest.avoidTolls).toBeTruthy();
                expect(createdRequest.region).toBe('cool place');
            }
        ));
    });

    function testFeed(
        observeRequests: (directions: Observable<google.maps.DirectionsResult>) => (done: DoneFn) => void,
        createFeed     : (places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>) => Observable<google.maps.DirectionsResult>,
        triggerRequests: (places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>) => void,
        requestCount   : number = 1
    )
    {
        return (done: DoneFn) =>
        {
            const places = new Subject<DirectionsPlace[]>();
            const config = new Subject<DirectionsRequestConfig>();

            const directions = createFeed(places, config).pipe(take(requestCount));

            observeRequests(directions)(done);

            triggerRequests(places, config);
        };
    }

    function testSuccessfulFeed(
        createFeed     : (places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>) => Observable<google.maps.DirectionsResult>,
        triggerRequests: (places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>) => void,
        requestCount?  : number
    )
    {
        return testFeed(directions => testSuccessfulRequest(() => directions), createFeed, triggerRequests, requestCount);
    }

    function testFailedFeed(
        createFeed     : (places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>) => Observable<google.maps.DirectionsResult>,
        triggerRequests: (places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>) => void,
        requestCount?  : number,
        errorMessage   : string | RegExp = /[Ff]ailed to retrieve directions/
    )
    {
        return testFeed(directions => testFailedRequest(() => directions, errorMessage), createFeed, triggerRequests, requestCount);
    }

    function createThroughFeed(places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>): Observable<google.maps.DirectionsResult>
    {
        return service.throughFeed(places, config);
    }

    function trigger1stDummyRequest(places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>, placesArray: DirectionsPlace[] = through)
    {
        config.next({});
        places.next(placesArray);
    }

    describe('calling `throughFeed()`', () =>
    {
        it('should return a hot observable that emits the results of a successfull directions request for each change in `places` or `config`', testSuccessfulFeed(
            createThroughFeed,
            (places, config) =>
            { 
                trigger1stDummyRequest(places, config);
                // 2nd request trigger
                places.next(through);
                // 3rd request trigger
                config.next({});
            }, 3
        ));

        it('should return a hot observable that errors with the error details from a failed directions request triggered by a change in `places` or `config`', testFailedFeed(
            createThroughFeed,
            trigger1stDummyRequest
        ));

        it('should return a hot observable that runs the directions request outside angular for each change in `places` or `config`', testFeed(
            directions =>
            {
                expect(runOutsideAngularWhenReady).not.toHaveBeenCalled();

                return testSuccessfulRequest(() => directions, () => expect(runOutsideAngularWhenReady).toHaveBeenCalledTimes(1));
            },
            createThroughFeed,
            trigger1stDummyRequest
        ));
        
        it('should error when less than 2 places are specified', testFailedFeed(
            createThroughFeed,
            (places, config) => trigger1stDummyRequest(places, config, through.slice(0, 1)),
            1,
            /[Aa]t least 2/
        ));

        // Skipped implementing these to save time. It is most likely that feed implementation will always depend on the already tested methods above.
        // it('should not trigger a request when no places array is specified');
        // it('should use the first provided place as the origin for the request');
        // it('should use the last provided place as the destination for the request');
        // it('should use every place between the first and last as waypoints for the request');
        // it('should set a default driving mode when none is provided');
        // it('should assign the provided options to the request');
    });

    function createRouteFeed(places: Subject<DirectionsPlace[]>, config: Subject<DirectionsRequestConfig>): Observable<google.maps.DirectionsResult>
    {
        return service.routeFeed(places.pipe(map(p => p[0])), places.pipe(map(p => p[1])), config);
    }
        
    describe('calling `routeFeed()`', () =>
    {
        it('should return a hot observable that emits the results of a successfull directions request for each change in `from`, `to` or `config`', testSuccessfulFeed(
            createRouteFeed,
            (places, config) =>
            { 
                trigger1stDummyRequest(places, config);
                // 2nd request trigger
                places.next(through);
                // 3rd request trigger
                config.next({});
            }, 3
        ));

        it('should return a hot observable that errors with the error details from a failed directions request triggered by a change in `from`, `to` or `config`', testFailedFeed(
            createRouteFeed,
            trigger1stDummyRequest
        ));

        it('should return a hot observable that runs the directions request outside angular for each change in `from`, `to` or `config`', testFeed(
            directions =>
            {
                expect(runOutsideAngularWhenReady).not.toHaveBeenCalled();

                return testSuccessfulRequest(() => directions, () => expect(runOutsideAngularWhenReady).toHaveBeenCalledTimes(1));
            },
            createRouteFeed,
            trigger1stDummyRequest
        ));
                
        // Skipped implementing these to save time. It is most likely that feed implementation will always depend on the already tested methods above.
        // it('should not trigger a request when only one of `from` and `to` is specified');
        // it('should use `from` as the origin for the request');
        // it('should use `to` as the destination for the request');
        // it('should set a default driving mode when none is provided');
        // it('should assign the provided options to the request');
    });
});
