import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppSignInComponent } from './app-sign-in.component';

@NgModule({
    declarations:[
        AppSignInComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forChild([{path:'login',component:AppSignInComponent}])
    ],
    exports:[
        AppSignInComponent,
        RouterModule
    ]
})
export class AppSignInModule{ }