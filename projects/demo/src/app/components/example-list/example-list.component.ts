import { Component      } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Topic } from '../../types/topic';

@Component({
    selector   : 'demo-example-list',
    templateUrl: './example-list.component.html',
    styleUrls  : ['./example-list.component.scss']
})
export class ExampleListComponent
{
    public topic: Topic;

    constructor(route: ActivatedRoute)
    {
        this.topic = route.snapshot.data as Topic;
    }
}
