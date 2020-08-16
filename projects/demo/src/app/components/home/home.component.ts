import { Component, OnInit } from '@angular/core';

import { Topic  } from '../../types/topic';
import { Topics } from '../../topics/all';

@Component({
    selector   : 'demo-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    public topics: Topic[] = Topics;

    constructor() { }

    ngOnInit(): void
    {
    }
}
