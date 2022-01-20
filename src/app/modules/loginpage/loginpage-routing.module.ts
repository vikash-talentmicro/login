import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/shared/auth.guard';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { HomeComponent } from './components/home/home.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';


const routes: Routes = [
//   {

//   path: "",

// component:LoginpageComponent

// },

{
  path:"resetpassword",component: ResetpasswordComponent 
},
{
  path:"home",component: HomeComponent,canActivate:[AuthGuard]
},
{
  path:"login",component: LoginpageComponent
},
{
  path:"changepassword",component: ChangepasswordComponent
},
// {

//   path: "**",

//   redirectTo: "login"

// },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class LoginpageRoutingModule { }
