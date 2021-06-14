import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Malfunction } from 'src/app/models/malfunction';

@Component({
  selector: 'app-list-malfunctions',
  templateUrl: './list-malfunctions.component.html',
  styleUrls: ['./list-malfunctions.component.scss']
})
export class ListMalfunctionsComponent implements OnInit {
  @Input() malfunctions!: Malfunction[];
  @Output() listChanged = new EventEmitter(); 
  selectedMalfunction: Malfunction | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  selectMalfunction(mal: Malfunction): void {
    this.selectedMalfunction = mal;
  }

}
