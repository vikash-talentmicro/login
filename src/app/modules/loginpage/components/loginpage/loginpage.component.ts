import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

// import {MatDialog} from '@angular/material/dialog';
// import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import { FormControl,FormGroup,Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { User } from '../classes/login/user';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/shared/notification/notification.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
// import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {
  loginForm = new FormGroup({
    userid: new FormControl(''),
    password: new FormControl(''),
  });


  userid: string = '';
  password: string = '';
  constructor(private loginService: LoginService,
    private router: Router,
    

    private session_svc: SessionService,
    private notif_svc : NotificationService,
    public dialog: MatDialog) {
    // openSnackBar(message: string, action: string) {
    //   this._snackBar.open(message, action);
    // }
  }
  //  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    var lngId = 1;
    localStorage.setItem('lngId', JSON.stringify(lngId));
    // console.log(lngId);
    // this.http.get('http://icanrefer.jobraiser.com/api/icr/weblogin');

  }

  // addUserDetails(formValue: loginGroup) {
  //   console.log(formValue.value);
  //   const postBody = {
  //     employeeId: formValue.value.userid,
  //     password: formValue.value.password

  //   };
  //   this.loginService.generateAccessToken(postBody)
  //     .subscribe(data => {
  //       console.log(data);

  //     }, (err) => {
  //       console.log("unable to add user")
  //     })
  // }
  addUserDetails() {

    // console.log(this.loginForm.value);
    const postBody = {
      employeeId: this.loginForm.controls['userid'].value,
      password: this.loginForm.controls['password'].value

    };
    this.loginService.generateAccessToken(postBody)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/home']);
        this.notif_svc.openSnackBar('Login Succesful');
       

      }, (err) => {
        console.log("unable to add user")
      })
     

  }

  loginWithUsernameAndPassword() {
    console.log(this.loginForm.value);

    // let obj = {
    //   firstName: "test",
    //   lastName: "test lastName",
    //   token: "test token"
    // };
    // this.notif_svc.openSnackBar('Login Succesful');
    // this.session_svc.session.next(obj);

   
   
    
  
  }
 // loginForm=new FormGroup({
    //   userid:new FormControl('',Validators.required)
    // })
    // get userid(){return this.loginForm.get('userid')}
    // constructor(private modalService: NgbModal) {}
    // closeResult = '';
    // open(content:any) {
    //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //     this.closeResult = `Closed with: ${result}`;
    //   }, (reason) => {
    //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   });
    // }
  
  
    // private getDismissReason(reason: any): string {
    //   if (reason === ModalDismissReasons.ESC) {
    //     return 'by pressing ESC';
    //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //     return 'by clicking on a backdrop';
    //   } else {
    //     return `with: ${reason}`;
    //   }
    // }
  
onResetPassword(){
  const dialogConfig= new MatDialogConfig;
   dialogConfig.width="80%";

  this.dialog.open(ResetpasswordComponent,{panelClass:['custom-dialog-container','my-dialog','dialogConfig']});

}

}



