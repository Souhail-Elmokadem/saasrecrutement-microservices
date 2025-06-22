import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone:false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return '';
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Invalid date for timeAgo pipe:', value);
      return '';
    }
  }
  
}



