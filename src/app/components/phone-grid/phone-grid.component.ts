import { Component, OnInit, Input, Output } from '@angular/core';
import { RespuestaMovil } from '../../interfaces/interfaces';

@Component({
  selector: 'app-phone-grid',
  templateUrl: './phone-grid.component.html',
  styleUrls: ['./phone-grid.component.scss'],
})
export class PhoneGridComponent implements OnInit {

  @Input() phones: RespuestaMovil[] = [];
  @Input() categoria;
  constructor() {}

  ngOnInit() { }


}
