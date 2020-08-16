import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { ExamplesComponent } from './components/examples/examples.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleListComponent,
    ExamplesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
