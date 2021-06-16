import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PersonalFormComponent } from './pages/personal-form/personal-form.component';
import { PersonalListComponent } from './pages/personal-list/personal-list.component';
import { PositionFormComponent } from './pages/position-form/position-form.component';
import { PositionListComponent } from './pages/position-list/position-list.component';
import { PersonalLayoutComponent } from './shared/components/personal-layout/personal-layout.component';

const routes: Routes = [
  {
    path:'',
    component: PersonalLayoutComponent,
    children: [
      {
        path:'', 
        component: MainPageComponent,
      },
      {
        path:'personals', 
        component: PersonalListComponent,
      },
      {
        path:'personals/personal/:id', 
        component: PersonalFormComponent,
      },
      {
        path:'personals/personal', 
        component: PersonalFormComponent,
      },
      {
        path:'positions', 
        component: PositionListComponent,
      },
      {
        path:'positions/position', 
        component: PositionFormComponent,
      },
      {
        path:'positions/position/:id', 
        component: PositionFormComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
