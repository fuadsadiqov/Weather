import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component';
import { CityComponent } from './component/city/city.component';
import { LoginComponent } from './component/login/login.component';
import { ListPageComponent } from './component/list-page/list-page.component';
import { MapPageComponent } from './component/map-page/map-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: '*',
    component: MainPageComponent
  },
  {
    path: 'cities',
    component: MainPageComponent,
    children: [
      {
        path: 'list', 
        component: ListPageComponent
      },
      {
        path: 'map', 
        component: MapPageComponent,
      },
    ],
    data: { onSameUrlNavigation: 'reload' }
  },
  {
    path: 'city/:id',
    component: CityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
