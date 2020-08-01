import { Component } from '@angular/core';
import arrayWords from '../utils/words';
import arrayCountries from '../utils/countries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'word-generator';

  words = '';
  limit = 10;

  countries = '';
  min = null;
  max = null

  handleSlideChange(newLimit: number){
    this.limit = newLimit;
  }

  generate(){
    this.words = arrayWords.slice(0, this.limit).join(' ');
  }

  generateCountries(){
    this.min = Math.floor(Math.random() * (11 - 0)) + 0;
    this.max = Math.floor(Math.random() * (21 - 11)) + 11;
    this.countries = arrayCountries.slice(this.min, this.max).join(' ');
  }

}
