import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './component/main-page/main-page.component';
import { CityComponent } from './component/city/city.component';
import { ListPageComponent } from './component/list-page/list-page.component';
import { LoginComponent } from './component/login/login.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './component/chart/chart.component';
import { LOCALE_ID } from '@angular/core';
import { MapPageComponent } from './component/map-page/map-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CityComponent,
    ListPageComponent,
    LoginComponent,
    ChartComponent,
    MapPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
