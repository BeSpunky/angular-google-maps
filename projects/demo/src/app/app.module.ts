import { BrowserModule           } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule                } from '@angular/core';
import { CommonModule            } from '@angular/common';
import { FlexLayoutModule        } from '@angular/flex-layout';

import { AppRoutingModule     } from './app-routing.module';
import { AppMaterialModule    } from './app-material.module';
import { AppComponent         } from './app.component';
import { HomeComponent        } from './components/home/home.component';
import { ExampleListComponent } from './components/example-list/example-list.component';
import { ExampleComponent     } from './components/example/example.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ExampleListComponent,
        ExampleComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        AppMaterialModule,
        FlexLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
