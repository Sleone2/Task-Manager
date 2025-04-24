import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
  standalone: true
})
export class SumPipe implements PipeTransform {
  transform(items: any[], field: string): number {
    if (!items) return 0;
    return items.reduce((sum, item) => sum + item[field], 0);
  }
} 