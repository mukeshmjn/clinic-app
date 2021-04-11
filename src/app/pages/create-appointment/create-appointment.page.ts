import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.page.html',
  styleUrls: ['./create-appointment.page.scss'],
})
export class CreateAppointmentPage implements OnInit {
  appointmentform:FormGroup;

  constructor(private aps: AppointmentService,
     private fb: FormBuilder ,
      public router:Router,
      private toast: ToastService) { }

  ngOnInit() {
    this.forminit();
 
  }
//form initialisation
  forminit(){
    this.appointmentform = this.fb.group({
    
      name: [''],
      cno: [''],
      prblm: [''],
      des: [''],
      toa: [''],
      date: [''],
      time: [''],

    });
  }

//create an appointment
  createAppointment(){
    var data = this.appointmentform.value;
    data.status = "Unapproved"
    this.aps.createAppointment(data).subscribe(res=>{
     // console.log(res)
     this.toast.presentToast('Successfully created the appointment')
      this.router.navigate(['home'])
    })

    
  }

  onSubmit(){
   // console.log(this.appointmentform.value)
    this.createAppointment();
  }

 
}
