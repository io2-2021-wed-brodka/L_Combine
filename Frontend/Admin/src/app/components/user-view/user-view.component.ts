import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  tech!: boolean;
  constructor( 
    private router: Router,
    private route: ActivatedRoute
    ) { 
    this.tech = /users$/.test(router.url)? false: true;
  }

  ngOnInit(): void {
  }

  togglePage(){
    this.router.navigate([this.tech?'users':'techs'],{ relativeTo: this.route.parent })
    this.tech = !this.tech;
  }

}
