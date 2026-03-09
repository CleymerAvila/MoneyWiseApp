import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  standalone: false,
})
export class RelativeDatePipe implements PipeTransform {

  transform(value: Date | string  | number): string {
    if(!value) return '';

    const date = new Date(value);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime  = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if(diffDays === 0){
      return 'Hoy';
    }

    if(diffDays === 1){
      return 'Ayer';
    }

    if(diffDays < 7){
      return `Hace ${diffDays} dias`;
    }

    return new Intl.DateTimeFormat('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

}
