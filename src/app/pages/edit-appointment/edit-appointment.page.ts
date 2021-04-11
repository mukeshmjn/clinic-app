import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ToastService } from 'src/app/services/shared/toast.service';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.page.html',
  styleUrls: ['./edit-appointment.page.scss'],
})
export class EditAppointmentPage implements OnInit {

  appointmentform:FormGroup;
  appointmentId:any;
  appointmentData:any

  constructor(private router:Router,
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private aps: AppointmentService,
    private toast: ToastService) { }

  ngOnInit() {
    
    this.ar.queryParams.subscribe(params=>{
      this.appointmentId = params['appointment-id'];
      
      this.getSingleAppointment();
    })
  }

  forminit(){
    this.appointmentform = this.fb.group({
    
      name: [this.appointmentData.name || ''],
      cno: [this.appointmentData.cno || ''],
      prblm: [this.appointmentData.prblm || ''],
      des: [this.appointmentData.des || ''],
      toa: [this.appointmentData.toa || ''],
      date: [this.appointmentData.date || ''],
      time: [this.appointmentData.time || ''],

    });
  }

  getSingleAppointment(){
    this.appointmentId
    this.aps.getSingleAppointment(this.appointmentId).subscribe(res=>{
     // console.log(res.data())
      this.appointmentData = res.data()
      this.forminit();
    })
  }
  editAppointment(){
    var data = this.appointmentform.value;
    data.id = this.appointmentData.id
    this.aps.editAppointment(data).subscribe(res=>{
     // console.log(res)
     this.toast.presentToast('Successfully edited the appointment')

      this.router.navigate(['home'])
    })

    
  }

  onSubmit(){
    // console.log(this.appointmentform.value)
     this.editAppointment();
   }

   
}
