import { Component, Injectable, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { APIService } from './starwarservice.service';
import { starwars, starwarscharacterfilms } from './starwars';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular 7 Project consuming Star Wars Web API';
  characters: starwars[];  
  filmsTitleAndReleaseDate: starwarscharacterfilms [];
  error: string;

  constructor(private apiService: APIService) {}

ngOnInit(){  
  this.apiService.getSrarwarsCharacters().subscribe(data => {    
    this.characters = data['characters'];
  });
}
  
getFilmsForTheSelectedCharacter(filterVal: string) {  
  let callFilmsAPI = [];
  this.error = '';
  if(filterVal != ""){
  this.apiService.getFilms(filterVal).subscribe(data => {
  for (var _i = 0; _i < data['films'].length; _i++) {    
    callFilmsAPI.push(this.apiService.getFilms(data['films'][_i]));
  }
  
  forkJoin(...callFilmsAPI).subscribe(data => {       
      this.filmsTitleAndReleaseDate = data;
    }, err => console.log('error ' + err),
    () => console.log('Ok ')
  )
}, error => {
    this.error = error;
    this.filmsTitleAndReleaseDate = [];
});
} else {
  this.filmsTitleAndReleaseDate = [];
}
}
}