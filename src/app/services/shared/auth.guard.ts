import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean>{
    if(this.auth.IsLoggedIn()){
      return true;
    }
    alert("you have not logged In");
   this.router.navigate(['login']);
   return false;
  }
 
  
}
// canActivate(
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot): boolean | Promise<boolean> {
//   var isAuthenticated = this.authService.getAuthStatus();
//   if (!isAuthenticated) {
//       this.router.navigate(['/login']);
//   }
//   return isAuthenticated;
// }