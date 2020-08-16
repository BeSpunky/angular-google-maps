import { NgModule } from '@angular/core';

import { LayoutModule     } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule    } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule    } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule    } from '@angular/material/tree';
import { MatListModule    } from '@angular/material/list';

const exported = [
    LayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatSidenavModule,
    MatTreeModule,
    MatListModule
];

@NgModule({
    imports: exported,
    exports: exported
})
export class AppMaterialModule { }