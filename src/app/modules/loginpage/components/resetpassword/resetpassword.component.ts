import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})

export class ResetpasswordComponent implements OnInit {


  resetPasswordForm = new FormGroup({
    userId: new FormControl('',[Validators.required])
    
   });
  //  userId : string = '';

   
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }
  onClick(){
    
  }
  get first(){
    return this.resetPasswordForm.controls;
  }
 resetPassword() {
   
        //  console.log("hello");
      console.log(this.resetPasswordForm.value);
//       const postBody = {
//         oldPassword: this.PasswordForm.controls['currentPassword'].value,
//         newPassword: this.changePasswordForm.controls['confirmNewPassword'].value
  
//       };
//       this.loginService.changepasswordToken(postBody)
//         .subscribe(data => {
//           console.log(data);
  
//         }, (err) => {
//           console.log("unable to add user")
//         })
}

}
export class DialogElementsExampleDialog {}