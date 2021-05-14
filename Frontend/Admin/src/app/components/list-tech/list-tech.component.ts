import { Component, OnInit } from '@angular/core';
import Tech from 'src/app/models/tech';
import { TechService } from 'src/app/services/tech.service';
import { techFromDTO } from 'src/app/utils/dto-utils';

@Component({
  selector: 'app-list-tech',
  templateUrl: './list-tech.component.html',
  styleUrls: ['./list-tech.component.scss']
})
export class ListTechComponent implements OnInit {
  isFormVisible: boolean = false;
  techs!: Tech[]
  selectedTech: Tech | undefined;
  constructor(private techService: TechService) { }

  ngOnInit(): void {
    this.getTechsList();
  }
  getTechsList(){
    this.techService.getTechs().subscribe(data=>{
      this.techs = data.techs.map(techFromDTO);
    });
  }
  selectTech(tech: Tech){
    this.selectedTech = tech===this.selectedTech? undefined : tech;
  }
  toggleForm(){
    this.isFormVisible = !this.isFormVisible;
  }
}
