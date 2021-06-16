import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalListComponent } from './pages/personal-list/personal-list.component';
import { PersonalFormComponent } from './pages/personal-form/personal-form.component';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { PositionFormComponent } from './pages/position-form/position-form.component';
import { PersonalLayoutComponent } from './shared/components/personal-layout/personal-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonalListComponent,
    PersonalFormComponent,
    PositionListComponent,
    PositionFormComponent,
    PersonalLayoutComponent,
    HeaderComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
