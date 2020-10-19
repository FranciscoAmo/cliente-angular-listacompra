import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from '../layout/mainlayout/mainlayout.component';
import { MainComponent } from './main/main.component';
import { LayoutModule } from '../layout/layout.module';
import { ListComponent } from './list/list.component';


const pageRoutes: Routes = [
    {
        path: 'main',
        component: MainlayoutComponent,
        children: [
            { path: 'main', component: MainComponent },
            { path: 'list/:id', component: ListComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pageRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PageRoutingModule { }
