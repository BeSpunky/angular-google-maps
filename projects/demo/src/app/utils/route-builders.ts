import { Route } from '@angular/router'

import { ExampleComponent     } from '../components/example/example.component';
import { ExampleListComponent } from '../components/example-list/example-list.component';
import { Example              } from '../types/example';
import { Topic                } from '../types/topic';

export function example(data: Example): Route
{
    return {
        path: data.title,
        data,
        component: ExampleComponent
    };
}

export function topic(data: Topic): Route
{
    return {
        path: data.title,
        children: [
            {
                path: '',
                component: ExampleListComponent,
                data
            },
            ...data.examples.map(example)
        ]
    };
}