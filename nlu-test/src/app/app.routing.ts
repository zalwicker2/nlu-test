import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FlavorDetailComponent } from './pages/flavor-detail/flavor-detail.component';
import { FlavorsComponent } from './pages/flavors/flavors.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'flavors', component: FlavorsComponent },
    { path: 'flavors/:flavor', component: FlavorDetailComponent },
    { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }