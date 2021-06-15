import {Component, OnInit, TemplateRef} from '@angular/core';
import {Role} from 'src/app/dto/authenticate-response-dto';
import {LoginService} from '../../services/login.service';
import {CONTACT_CONSTS} from '../../constants/contact';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isTech!: boolean;
  contactNumber: string = CONTACT_CONSTS.PHONE_NUMBER;
  constructor(private loginService: LoginService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    const role = this.loginService.getRole();
    this.isTech = role === Role.Tech || role === Role.Admin;
  }

  logout(): void {
    this.loginService.logout();
  }

  openModal(modalData: TemplateRef<any>): void {
    this.modalService.open(modalData, {ariaLabelledBy: 'modal-basic-title'});
  }
}
