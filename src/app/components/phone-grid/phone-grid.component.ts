import { Component, OnInit, Input } from '@angular/core';
import { Phone } from 'src/app/interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-phone-grid',
  templateUrl: './phone-grid.component.html',
  styleUrls: ['./phone-grid.component.scss'],
})
export class PhoneGridComponent implements OnInit {

  @Input() phones: Phone[] = [];
  @Input() segment;

  categoria: string;

  constructor() { }

  ngOnInit() {
    this.categoria = this.segment.value;
    console.log('this.categoria', this.categoria);
  }

}
