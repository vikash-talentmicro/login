import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginpageRoutingModule } from './loginpage-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginInterceptor } from './login.interceptor';
import { HomeComponent } from './components/home/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
// import { Home1Component } from './components/loginpage/home1/home1.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
// import { LoginService } from 'src/app/services/login.service';

// import { LoginComponent } from './classes/login/login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginpageComponent,
    ResetpasswordComponent,
    HomeComponent,
    ChangepasswordComponent,
    // Home1Component,
    // LoginComponent,
  
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LoginpageComponent,
    ResetpasswordComponent,
    MatDialogModule,
    MatSnackBarModule,
    HomeComponent,
    MatMenuModule,MatInputModule
    
  ],
  imports: [
    CommonModule,
    LoginpageRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,MatMenuModule,MatFormFieldModule,MatIconModule,MatInputModule
  
  ],
  providers:[
  {provide:HTTP_INTERCEPTORS,useClass:LoginInterceptor,multi:true}
],
})
export class LoginpageModule { }
