import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { starwars, starwarscharacterfilms  } from './Starwars';
import charactersjson from './data/characters.json';

@Injectable({ providedIn: 'root' })
 
 export class APIService {
   url: string = 'https://swapi.co/api/people/';

   constructor(private http: HttpClient) {}
//Load initially all the characters.
   getSrarwarsCharacters() : Observable<starwars[]> {
    return this.http.get<starwars[]>('./assets/data/characters.json').pipe(
        tap(_data => console.log('fetched Starwars characters')),
        catchError(this.handleError<starwars[]>('Error in getting initial character local api', []))
      );
  }
//reiterate this HTTP Get for getting Films
getFilms<Data>(nFilms: string): Observable<any[]> {
    return this.http.get<any[]>(nFilms)
      .pipe(
        tap(_data => console.log('fetched the data;')),
        catchError(this.handleError<string[]>('Error in getting sequence films web api', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    let errorMessage = '';
    return (error: any): Observable<T> => {      
      console.error(error); // log to console instead      
      console.log(`${operation} failed: ${error.message}`);
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
      //returning an empty result.
      return throwError(errorMessage);
    };
  }
 }