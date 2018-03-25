import {Cabinet} from '../data';
import {Injectable} from '@angular/core';
import {CabinetsHttp} from '../http';

@Injectable()
export class CabinetsService {
  public constructor(
    private cabinetsHttp: CabinetsHttp
  ) {}

  public getAllCabinets(): Promise<Array<Cabinet>> {
    return this.cabinetsHttp.getAllCabinets();
  }

  public getCabinet(cabinetId: number): Promise<Cabinet> {
    return this.cabinetsHttp.getCabinet(cabinetId);
  }

  public createCabinet(cabinet: Cabinet): Promise<number> {
    return this.cabinetsHttp.createCabinet(cabinet);
  }

  public editCabinet(cabinet: Cabinet): Promise<void> {
    return this.cabinetsHttp.editCabinet(cabinet);
  }

  public deleteCabinet(cabinetId: number): Promise<void> {
    return this.cabinetsHttp.deleteCabinet(cabinetId);
  }
}
