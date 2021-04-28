import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {

  constructor(params?: Params) {
    this.params = params
  }
  private params: Params | undefined;
  readonly snapshot = {
    paramMap: {
        get: (key:string)=>this.params?.[key]
    }
  }
}