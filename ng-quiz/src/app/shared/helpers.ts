import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';

const URL = 'http://localhost:8000';
/**
 * Setzt den Auth Header.
 * @param token Token des eingeloggten Users   *
 * @returns Authorization Header und Content-Type
 */
export function setAuthHeader(token) {
  const headers = new HttpHeaders({
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  });
  return headers;
}

/**
 * Setzt die URL  zusammen.
 * @returns URL mit Pfad
 */
export function getUrl(model: string) {
  return `${URL}/${model}`;
}

/**
 * Setzt die URL mit ID zusammen.
 * @param id ID des Objekts
 * @returns URL mit Pfad und ID
 */
export function getUrlById(model: string, id: number) {
  return `${getUrl(model)}/${id}`;
}

/**
 * Setzt die URL mit ID zusammen.
 * @param id ID des Objekts
 * @returns URL mit Pfad und ID
 */
export function getUrlByIdId(model: string, id: number, id2: number) {
  return `${getUrl(model)}/${id}/${id2}`;
}

/**
 * Behandelt Fehlermeldungen
 * @param errorRes Error
 * @returns xxxxxxxxx
 */
export function handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return throwError(errorMessage);
  }
  switch (errorRes.error.error.message) {
    case 'Foo':
      errorMessage = 'Foo';
      break;
  }
  return throwError(errorMessage);
}
