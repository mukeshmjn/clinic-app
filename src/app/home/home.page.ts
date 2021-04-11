import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ToastService } from 'src/app/services/shared/toast.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appointments:any
  ngOnInit() {
  
    this.getAppointments();
  }
  constructor(private menu: MenuController,
    private storage: Storage,
    private aps: AppointmentService,
    private toast: ToastService,
    public alertController: AlertController,
    private router: Router) {}

  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  //get all appointments
  getAppointments(){
    this.aps.getAppointments().subscribe(res=>{
    // console.log(res)
    this.appointments = res

    })
  }

  deleteAppointment(data){
 
this.presentAlertConfirm().then(res=>{
if(res.role == 'confirmed'){
  this.aps.deleteAppointment(data).subscribe(res=>{
    console.log(res)
    this.toast.presentToast('Successfully deleted the appointment');
})
}
    
});
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Appointment!',
      message: 'Are you sure you want to <strong>delete</strong> the appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          role: 'confirmed',
          handler: () => {
           console.log('Confirm Okay');
            
          }
        }
      ]
    });

    await alert.present();
    return await alert.onDidDismiss()
  }

  
}
