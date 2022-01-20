import { SessionService } from './session/session.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login_url = environment.SERVER_URL;
  constructor(private http: HttpClient,
    private session_svc: SessionService) { }
  // addUser(body: any) {
  //   return this.http.post('http://icanrefer.jobraiser.com/api/icr/weblogin', body)
  //   // }

  //   // getUsers(){
  //   //   // return this.http.get('http://icanrefer.jobraiser.com/api/icr/weblogin');
  //   // }
  // }

  generateAccessToken(params) {
    console.log(params);
    return this.http.post(this.login_url + 'icr/weblogin', params).pipe(
      map(
        (res) => {
          if (res && res['data'] && res['status']) {
            // res['data'].isEmployer = params.isEmployer;
            if (res['data'].userDetails) {
              this.session_svc.setSession(res['data'].userDetails);
              this.session_svc.setUserDetails(res['data'].userDetails);
            }
            return res;
          } else {
            return res;
          }
        },
        (err) => {
          return err;
        }
      )
    );
  }
  changepasswordToken(params){
    console.log(params);
    return this.http.post(this.login_url+'icr/changePasswordWeb',params);
  }
  
  // generateAccessToken(params) {
  //   console.log(params);
  //   return this.http.post(this.login_url + 'icr/changePassword', params).pipe(
  //     map(
  //       (res) => {
  //         if (res && res['data'] && res['status']) {
  //           // res['data'].isEmployer = params.isEmployer;
  //           if (res['data'].userDetails) {
  //             this.session_svc.setSession(res['data'].userDetails);
  //             this.session_svc.setUserDetails(res['data'].userDetails);
  //           }
  //           return res;
  //         } else {
  //           return res;
  //         }
  //       },
  //       (err) => {
  //         return err;
  //       }
  //     )
  //   );
  // }
}