import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  hide = true;
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('',[Validators.required,Validators.maxLength(8)]),
    confirmNewPassword: new FormControl('',[Validators.required,Validators.maxLength(8)]),
    reEnterPassword: new FormControl('',[Validators.required,Validators.maxLength(8)])
   });
   currentPassword : string = '';
   confirmNewPassword : string = '';
   reEnterPassword:string='';
   get first(){
     return this.changePasswordForm.controls;
   }
   
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }
  // changePassword(){
  //   console.log(this.changePasswordForm.value);

  // }
  onClick(){
    
  }
changePassword() {
         console.log("hello");
      // console.log(this.loginForm.value);
      const postBody = {
        oldPassword: this.changePasswordForm.controls['currentPassword'].value,
        newPassword: this.changePasswordForm.controls['confirmNewPassword'].value
  
      };
      this.loginService.changepasswordToken(postBody)
        .subscribe(data => {
          console.log(data);
  
        }, (err) => {
          console.log("unable to add user")
        })
}
}
export class DialogElementsExampleDialog {}

// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
   
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
 
// }