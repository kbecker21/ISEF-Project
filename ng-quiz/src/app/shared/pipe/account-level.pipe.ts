import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountLevelPipe'
})

/**
 * Diese Komponente implementiert die AccountLevelPipe.
 */
export class AccountLevelPipe implements PipeTransform {

  /**
   * Transformiert das Account Level auf den Status
   * @param value Account Level
   * @returns Status
   */
  transform(value: any) {
    if (value == 4)
      return 'Tutor';
    if (value == 5)
      return 'Admin';
    return 'Student';
  }

}
