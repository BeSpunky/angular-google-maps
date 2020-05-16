# Intro
Components, directives and event handlers try to give you as much control as possible out of the box. However, advanced scenarios will probably require a different approach. This page will guide you through extracting the underlying objects from the components and using them to programmatically control what's going on with your maps.

If you still haven't read [Basic Concepts](/Basic-Concepts), now is the time...

[[_TOC_]]

# Extracting Wrappers Through Events
When an event is emitted, given that you passed in the `$event` argument, you will have direct access to the wrapper  which emitted the event.

```html
<!-- Your component template -->

<bs-google-map *bsSafe>
    <bs-google-maps-polygon [path]="[[1,1], [2,2], [3,3]]"
                            (click)="onPolygonClick($event)"></bs-google-maps-polygon>
</bs-google-map>
```

```typescript
// Your component class

@Component({
    selector   : 'app-my-map',
    templateUrl: './my-map.component.html',
    styleUrls  : ['./my-map.component.css']
})
export class MyMapComponent
{
    public onPolygonClick(event: GoogleMapsEventData)
    {
        // Access the emitter and 
        (event.emitter as IGoogleMapsPolygon).setFillColor('green');
    }
}
```