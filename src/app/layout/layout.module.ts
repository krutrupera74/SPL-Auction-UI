
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    declarations: [
        HeaderComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule,
        HttpClientModule
    ],
    providers: [
    ],
})
export class LayoutModule { }
