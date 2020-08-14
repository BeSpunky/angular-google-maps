import { NgModule } from '@angular/core';

import { MockComponent } from './mock-component';

@NgModule({
    declarations: [MockComponent],
    exports     : [MockComponent]
})
export class MockModule { }
