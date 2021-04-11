import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private fireStore: AngularFirestore) {
//    this.fireStore.createId() // for creating a new doc id
   }
//create a new appointment
   createAppointment(data:any):Observable<any>{
     data.id = this.fireStore.createId();
     var id = data.id;
     return from(this.fireStore.doc(`appointment/${id}`).set(data));
   }

   //get all appointments
   getAppointments(){
    return this.fireStore.collection(`appointment`).valueChanges();
   }

   //get particular appointment
   getSingleAppointment(id){
    return this.fireStore.collection('appointment').doc(id).get()
   }

   //edit appointment
   editAppointment(data: any){
    return from(this.fireStore.doc(`appointment/${data.id}`).set(data));
   }

   //delete appointment
   deleteAppointment(data):Observable<any>{
     return from(this.fireStore.collection(`appointment/`).doc(data.id).delete())
   }
   
}
