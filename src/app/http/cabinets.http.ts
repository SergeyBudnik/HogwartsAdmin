import {Injectable} from '@angular/core';
import {Cabinet} from '../data';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CabinetsHttp {
  private root = `http://34.216.34.197:8080/HogwartsAPI/cabinets`;

  public constructor(
    private http: HttpClient
  ) {}

  public getAllCabinets(): Promise<Array<Cabinet>> {
    return this.http.get<Array<Cabinet>>(this.root).toPromise();
  }

  public getCabinet(cabinetId: number): Promise<Cabinet> {
    return this.http.get<Cabinet>(`${this.root}/${cabinetId}`).toPromise();
  }

  public createCabinet(cabinet: Cabinet): Promise<number> {
    return this.http.post(`${this.root}`, cabinet).toPromise().then(it => Number(it));
  }

  public editCabinet(cabinet: Cabinet): Promise<void> {
    return this.http.put(`${this.root}`, cabinet).toPromise().then(() => {});
  }

  public deleteCabinet(cabinetId: number): Promise<void> {
    return this.http.delete(`${this.root}/${cabinetId}`).toPromise().then(() => {});
  }
}
