import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AllGuard implements CanActivate {
  constructor(private userService: UserService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let sesion = this.userService.getSesion();
      if(sesion.rol!=1  &&  sesion.rol!=2){
        return true;
      }
      else{
        this.router.navigate(['/notfound']);
        return false;
      }
  }
  
}