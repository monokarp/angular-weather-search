import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'degrees' })
export class DegreesPipe implements PipeTransform {
  transform(value: number, format: 'C' | 'F' | 'K' = 'C'): string {
    return `${Math.round(value)} ${format == 'K' ? '' : String.fromCharCode(176)}${format}`;
  }
}
