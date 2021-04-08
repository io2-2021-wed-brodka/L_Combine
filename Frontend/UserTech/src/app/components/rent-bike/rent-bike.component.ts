import {Component, Input, OnInit} from '@angular/core';
import {Bike} from '../../models/bike';
import {Router} from '@angular/router';
import {RentResult} from '../../models/rentResult';
import {RentBikeService} from '../../services/rent-bike.service';

@Component({
  selector: 'app-rent-bike',
  templateUrl: './rent-bike.component.html',
  styleUrls: ['./rent-bike.component.scss']
})
export class RentBikeComponent implements OnInit {
  @Input() bike!: Bike;

  constructor(private rentBikeService: RentBikeService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  rent(): void {
    this.rentBikeService.rentBike(this.bike).subscribe((res: RentResult) => {
      res.result === 'Ok' ? this.router.navigate(['']) : console.log(res.result);
    });
  }
}
