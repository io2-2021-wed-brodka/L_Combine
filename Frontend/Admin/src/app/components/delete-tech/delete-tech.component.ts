import { Component, Input, OnInit } from '@angular/core';
import Tech from 'src/app/models/tech';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-delete-tech',
  templateUrl: './delete-tech.component.html',
  styleUrls: ['./delete-tech.component.scss']
})
export class DeleteTechComponent implements OnInit {
  @Input() tech!: Tech;

  constructor(
    private techService: TechService,
    private redirectService: RedirectService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  deleteTech(){
    this.techService.deleteTech(this.tech.id).subscribe(()=>{
      this.notificationService.success('Specjalista został usunięty');
      this.redirectService.reload();
    });
  }
}
