import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SessionService } from 'src/app/services/session/session.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  session: any = {};
  constructor(
    private session_svc: SessionService,
    private loginService: LoginService,
    public dialog: MatDialog,
    // private dialogRef:MatDialogRef<DialogOverviewExampleDialog>
  ) { console.log("aaaaaaaaabbbbbbbbbbbb");
}

  ngOnInit(): void {
    this.session_svc.session.subscribe(res => {
      console.log(res);
      this.session = res;
    })
  }
  onLogout(){
    this.session_svc.logout(true);
  }
    // changePassword() {
    //      console.log("hello");
    //   // console.log(this.loginForm.value);
    //   const postBody = {
    //   oldPassword:'asadda',
    //   newPassword:'asassa'
  
    //   };
    //   this.loginService.changepasswordToken(postBody)
    //     .subscribe(data => {
    //       console.log(data);
  
    //     }, (err) => {
    //       console.log("unable to add user")
    //     })
        
       
  onCreate(){
    const dialogConfig= new MatDialogConfig;
    // dialogConfig.width="40%";
 
    this.dialog.open(ChangepasswordComponent,{panelClass:['custom-dialog-container','my-dialog']});

  }

    
    
  
 

}

