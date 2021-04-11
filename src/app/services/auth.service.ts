import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth,
              private storage: Storage,
              private fireStore: AngularFirestore
              )
     {
      this.user = fireAuth.authState;
     }

     sendOtpToUser(number,captchaVerifier):Promise<any>{
     return this.fireAuth.signInWithPhoneNumber(number,captchaVerifier)
    }

    confirmOtp(confirmationResult,otpReceived):Promise<any>{
      return confirmationResult.confirm(otpReceived)
    }
}