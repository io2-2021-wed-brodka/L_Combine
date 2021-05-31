import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Malfunction } from 'src/app/models/malfunction';

@Component({
  selector: 'app-malfunction-details',
  templateUrl: './malfunction-details.component.html',
  styleUrls: ['./malfunction-details.component.scss']
})
export class MalfunctionDetailsComponent implements OnInit {
  @Input() malfunction!: Malfunction;
  constructor() { }

  ngOnInit(): void {
  }

}
