import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {MalfunctionsDTO} from '../dto/malfunctions-dto';
import {Malfunction, MalfunctionState} from '../models/malfunction';
import {MalfunctionDTO} from '../dto/malfunction-dto';
import {NewMalfunctionDTO} from '../dto/new-malfunction-dto';
import { BikeService } from './bike.service';
import { map } from 'rxjs/operators';
import { BikeState } from '../models/bike';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService {
  private baseUrl = `${environment.apiUrl}/malfunctions`;
  constructor(private http: HttpClient, private bikeService: BikeService) {
  }

  getMalfunctions(): Observable<Malfunction[]> {
    const malfunctionsRequest = this.http.get<MalfunctionsDTO>(this.baseUrl);
    const bikesRequest = this.bikeService.getAllBikes();
    return forkJoin([malfunctionsRequest, bikesRequest]).pipe(
      map(([malfunctions, bikes])=>malfunctions.malfunctions.map(malDto=>{
        const bike = bikes.bikes.find(bike=>bike.id===malDto.bikeId);
        return {...malDto, state: 
          bike?.status === BikeState.Rented? MalfunctionState.BikeRented : 
          bike?.status === BikeState.Blocked? MalfunctionState.InReparation :
          MalfunctionState.Waiting
        };
      }))
    );
  }

  postMalfunction(malfunction: NewMalfunctionDTO): Observable<MalfunctionDTO> {
    return this.http.post<Malfunction>(this.baseUrl, malfunction);
  }

  deleteMalfunction(malfunction: MalfunctionDTO): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${malfunction.id}`);
  }
}
