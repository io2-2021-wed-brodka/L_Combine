import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewTechDTO } from 'src/app/dto/new-tech-dto';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { TechService } from 'src/app/services/tech.service';

@Component({
  selector: 'app-add-tech',
  templateUrl: './add-tech.component.html',
  styleUrls: ['./add-tech.component.scss']
})
export class AddTechComponent implements OnInit {
  @Output() techListChanged = new EventEmitter();
  formData = {
    login: '',
    password: '',
    repeatPassword: ''
  };
  showPasswordsNotMatch = false;
  showAccountNameTaken = false;

  constructor(
    private techService: TechService,
    private redirectService: RedirectService,
    private notificationService: NotificationService
    ) { }
  
  ngOnInit(): void {
  }

  repeatPasswordChange(): void {
    this.showPasswordsNotMatch = false;
  }

  loginChange(): void {
    this.showAccountNameTaken = false;
  }

  addTech(){
    if (this.formData.password !== this.formData.repeatPassword) {
      this.showPasswordsNotMatch = true;
      return;
    }

    const tech: NewTechDTO = {
      name: this.formData.login, 
      password: this.formData.password
    };
    
    this.techService.addTech(tech).subscribe(()=>{
      this.notificationService.success('Specjalista został dodany')
      this.techListChanged.emit();
    }, error => {
      if (error.status === 409) {
        this.showAccountNameTaken = true;
      }
    });
  }
}
