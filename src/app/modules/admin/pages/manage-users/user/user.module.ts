import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { userRoutes } from './user.routing';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports     : [
        RouterModule.forChild(userRoutes),
        MatButtonModule,
        MatIconModule,
        CommonModule
    ]
})
export class UserModule
{
}
