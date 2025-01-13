import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginPage/login/login.component';

const routes: Routes = [
  { path:'',component: LoginComponent},
  {path:'famodule',loadChildren:()=>import('./financeLoading/finance-loading/finance-loading.module').then((m)=>m.FinanceLoadingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
