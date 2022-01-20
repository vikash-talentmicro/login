import { Injectable, Injector } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user: Session = new Session();
  notification_regid;
  session: BehaviorSubject<any> = new BehaviorSubject(null);
  access_rights: Object;
  path;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.updateSession();
  }
  setSession(obj) {
    let session = new Session();
    session.setData(obj);
    if (session) {
      let item = btoa(JSON.stringify(session));
      sessionStorage.setItem('u', item);
      this.updateSession();
    }
  }

  setUserDetails(obj) {
    this.user.setUserDetails(obj);

    let user = this.user.getUserDetails();
    if (user) {
      let item = btoa(JSON.stringify(user));
      sessionStorage.setItem('u', item);
      this.session.next(user);
    }
  }

  updateSession() {
    let session = sessionStorage.getItem('u');
    if (session) {
      let user = JSON.parse(atob(session));
      if (user && user.token) {
        this.user.setData(user);
        this.session.next(user);
        return this.user;
      }
    }
    return null;
  }

  getSessionData() {
    let session = sessionStorage.getItem('u');
    if (session) {
      let user = JSON.parse(atob(session));
      if (user && user.token) {
        return user;
      }
      else return null
    }
    else {
      return null;
    }
  }

  getSession(): Observable<Session> {
    return this.session.asObservable();
  }

  logout(flag?) {
    console.log("i am here")
    try {
      sessionStorage.removeItem('workbench')
    }
    catch (err) {
      console.log(err)
    }
    try {
      sessionStorage.removeItem('business')
    }
    catch (err) {
      console.log(err)
    }
    try {
      sessionStorage.removeItem('application_state')
    }
    catch (er) {
      console.log(er)
    }
    try {
      sessionStorage.removeItem('access_rights')
    }
    catch (er) {
      console.log(er)
    }
    try {
      sessionStorage.setItem('sellerCode', '0')
    }
    catch (err) {
      console.log(err)
    }

    if (flag) {
      sessionStorage.removeItem('u');
      this.session.next(null);
      this.user = new Session();
      this.router.navigate(['/login']);
      window.sessionStorage.clear();
    }
    else {
      let user
      try {
        user = atob(sessionStorage.getItem('u'))
        user = JSON.parse(user)
      }
      catch (err) {
        console.log(err)
        user = null;
      }
      if (user) {



      }
     
      
    }




    // private tab_svc: EntityTabsService
    // this.tab_svc.clearTabs();
  }

  checkUsertype() {
    let session = sessionStorage.getItem('u');
    if (session) {
      let user = JSON.parse(atob(session));
      if (user) {
        return user.isEmployer;
      }
      return null;
    }
    else {
      return null;
    }


  }

  checkSession() {

    if (this.user) {
      // this.updateSession();
      return this.user.token;
    }
    else {
      return null;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    let res = JSON.parse(sessionStorage.getItem('access_rights'))
    let access_rights
    if (res) {
      access_rights = res['data']
    }
    if (route.routeConfig.path == 'login') {
      if (this.checkSession()) {
        this.path = route.url[0].path;
        setTimeout(() => {
          this.router.navigate(['/my-settings']);
          return false;
        })
      }
      else {
        return true;
      }
    }
    else {
      if (this.checkSession()) {
        this.path = route.url[0].path;
        console.log(route)
        // this.checkingAccessRights();

      }

    }

  }

}
export class Session {
  userid;
  secretkey: string;
  token: string;
  about: string
  city: string
  createdDate: string
  currency: number
  displayName: string
  emailId: string
  enableResBank: number
  firstName: string
  icrAdmin: number
  icrSuperAdmin: number
  isBuyer: number
  isGroupAdmin: number
  isMessages: number
  isReferralMember: number
  isSeller: number
  isTranslator: number
  jobAdmin: number
  jobTitle: string
  lastName: string
  lastUpdatedDate: string
  latitude;
  lngRights;
  longitude;
  loyaltyPoints: number
  membershipId: string
  membershipStatus: number
  membershipStatusName: string
  mobileIsd: string
  mobileNumber: string
  organization: string
  profilePicture: string
  resId: number
  secretKey: string
  sellerList;
  userId: number

  setData(obj) {
    if (obj) {
      this.secretkey = obj.secretKey;
      this.token = obj.token;
    }
  }

  setUserDetails(obj) {
    if (obj) {
      this.token = obj.token || null;
      this.about = obj.about;
      this.city = obj.city;
      this.createdDate = obj.createdDate;
      this.currency = obj.currency;
      this.displayName = obj.displayName;
      this.emailId = obj.emailId;
      this.enableResBank = obj.enableResBank;
      this.firstName = obj.firstName;
      this.icrAdmin = obj.icrAdmin;
      this.icrSuperAdmin = obj.icrSuperAdmin;
      this.isBuyer = obj.isBuyer;
      this.isGroupAdmin = obj.isGroupAdmin;
      this.isMessages = obj.isMessages;
      this.isReferralMember = obj.isReferralMember;
      this.isSeller = obj.isSeller;
      this.isTranslator = obj.isTranslator;
      this.jobAdmin = obj.jobAdmin;
      this.jobTitle = obj.jobTitle;
      this.lastName = obj.lastName;
      this.lastUpdatedDate = obj.lastUpdatedDate;
      this.latitude = obj.latitude;
      this.lngRights = obj.lngRights;
      this.longitude = obj.longitude;
      this.loyaltyPoints = obj.loyaltyPoints;
      this.membershipId = obj.membershipId;
      this.membershipStatus = obj.membershipStatus;
      this.membershipStatusName = obj.membershipStatusName;
      this.mobileIsd = obj.mobileIsd;
      this.mobileNumber = obj.mobileNumber;
      this.organization = obj.organization;
      this.profilePicture = obj.profilePicture;
      this.resId = obj.resId;
      this.secretKey = obj.secretKey;
      this.sellerList = obj.sellerList;
      this.userId = obj.userId;



    }
  }

  getUserDetails() {
    return {
      userName: (this.firstName || ''),
      secretkey: this.secretKey,
      token: this.token,
      firstName: this.firstName,
      userId: this.userId,
      mobileNumber: this.mobileNumber,
      mobileIsd: this.mobileIsd,
    };
  }
}