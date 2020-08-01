import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { 
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
  faDatabase,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() user;

  faEnvelope = faEnvelope;
  faMapMarkedAlt = faMapMarkedAlt;
  faPhone = faPhone;
  faDatabase  = faDatabase;
  faCalendar = faCalendar;

  constructor(
    @Inject(DOCUMENT) private _document: Document
    ) { }

  ngOnInit(): void {
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }

}
