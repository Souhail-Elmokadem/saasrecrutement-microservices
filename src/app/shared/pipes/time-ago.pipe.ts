import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone:false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    return 'Edited ' + formatDistanceToNow(new Date(value), { addSuffix: true });
  }
  
}