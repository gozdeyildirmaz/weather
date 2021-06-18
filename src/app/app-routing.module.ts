import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
I prefered lazy loading for module because of advantage of performance.
 In this, situation only files of city are loaded.

 */

const routes: Routes = [
  { path: 'cities', loadChildren: () => import('./modules/cities/cities.module').then(m => m.CitiesModule) },
  {
    path: '',
    redirectTo: 'cities',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
