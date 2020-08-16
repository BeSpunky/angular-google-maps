import { Component, ElementRef } from '@angular/core';

import { Topic  } from '../../types/topic';
import { Topics } from '../../topics/all';

@Component({
    selector   : 'demo-home',
    templateUrl: './home.component.html',
    styleUrls  : ['./home.component.scss']
})
export class HomeComponent
{
    public topics: Topic[] = Topics;

    public slideTo(element: HTMLElement): void
    {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
