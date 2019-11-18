import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-printing',
  templateUrl: './options-printing.component.html',
  styleUrls: ['./options-printing.component.scss']
})
export class OptionsPrintingComponent implements OnInit {


  public listPrinters: Array<string> = ["RICOH IM C3000 on Ne01:", "Zerba TLP2488 on Ne02:"];

  constructor() { }

  ngOnInit() {
  }

}
