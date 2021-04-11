import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createAppointment'
})
export class CreateAppointmentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
