import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../interfaces/personal';
import { Position } from '../interfaces/position';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {
  
  constructor(private http: HttpClient) { }
  getPersonals():Promise<Personal[]>{
    return this.http.get<Personal[]>(`${environment.apiUrl}/personals`).toPromise();
  }
  getPersonal(index:number):Promise<Personal>{
    return this.http.get<Personal>(`${environment.apiUrl}/personals/${index}`).toPromise();
  }
  postPersonal(personal:Personal):Promise<Personal>{
    return this.http.post<Personal>(`${environment.apiUrl}/personals`, personal).toPromise();
  }
  putPersonal(personal:Personal,index:number):Promise<Personal>{
    return this.http.put<Personal>(`${environment.apiUrl}/personals/${index}`, personal).toPromise();
  }
  deletePersonal(index:number):Promise<Personal>{
    return this.http.delete<Personal>(`${environment.apiUrl}/personals/${index}`).toPromise();
  }


  getPositions():Promise<any>{
    return this.http.get<Position[]>(`${environment.apiUrl}/positions`).toPromise();
  }
  getPosition(index:number):Promise<any>{
    return this.http.get<Position>(`${environment.apiUrl}/positions/${index}`).toPromise();
  }
  postPosition(position:Position):Promise<Position>{
    return this.http.post<Position>(`${environment.apiUrl}/positions`, position).toPromise();
  }
  putPosition(position:Position,index:number):Promise<Position>{
    return this.http.put<Position>(`${environment.apiUrl}/positions/${index}`, position).toPromise();
  }
  deletePosition(index:number):Promise<Position>{
    return this.http.delete<Position>(`${environment.apiUrl}/positions/${index}`).toPromise();
  }

}
