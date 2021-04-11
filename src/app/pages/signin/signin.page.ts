import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/shared/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage implements OnInit {

  recaptchaVerifier:any
  otpinp:boolean=false
  confirmationResult:any
  signinForm: FormGroup;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebaseAuthentication: FirebaseAuthentication,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private storage: Storage,
    private authService: AuthService,
    private toast: ToastService
   ) { 
  
  }
 cordova: any;

  ngOnInit() {

    this.signinForm = this.formBuilder.group({
      num: [''],
      otp: ['']
    }); 
  
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible'
      });
   
  }

  sendOtp(){

    this.otpinp = true;
   
    let num='+91' + this.signinForm.value.num
    console.log(num)

    this.authService.sendOtpToUser(num,this.recaptchaVerifier).then(res=>{
      console.log('Otp sent Successfully: ',res)
      this.confirmationResult = res
      this.toast.presentToast('OTP Sent Successfully');
    })
  
  }

  onSubmit(){

    this.authService.confirmOtp(this.confirmationResult,this.signinForm.value.otp).then(res=>{
      console.log('Otp confrimed sucessfully: ',res)
      this.storage.set('loggedIntoken',res.user.uid)
      this.toast.presentToast('OTP Confirmed !')
      this.router.navigate(['/home'])
    })
  }
}
