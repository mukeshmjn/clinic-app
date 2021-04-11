import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
    private storage: Storage) { }

  canActivate() :Promise<boolean> {
   var a = this.storage.get('loggedIntoken').then(val=>{
      if (val) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signin']);
    
    return false;
    })
  return a

}
}
