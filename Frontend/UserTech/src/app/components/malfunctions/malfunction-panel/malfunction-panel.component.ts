import {Component, OnInit} from '@angular/core';
import {Malfunction} from 'src/app/models/malfunction';
import {MalfunctionService} from 'src/app/services/malfunction.service';

@Component({
  selector: 'app-malfunction-panel',
  templateUrl: './malfunction-panel.component.html',
  styleUrls: ['./malfunction-panel.component.scss']
})
export class MalfunctionPanelComponent implements OnInit {
  malfunctions!: Malfunction[];

  constructor(private malfunctionService: MalfunctionService) {
  }

  ngOnInit(): void {
    this.getMalfunctions();
  }

  getMalfunctions(): void {
    this.malfunctionService.getMalfunctions().subscribe(mals => {
      this.malfunctions = mals;
    });
  }
}
