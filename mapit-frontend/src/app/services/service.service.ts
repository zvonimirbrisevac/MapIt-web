import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/data-form',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private alignApiUrl = 'http://localhost:3000/align';
  private mappingApiUrl = 'http://localhost:3000/mapping'


  constructor(private http: HttpClient) {
  }

  sendAlignForm(form: FormData): Observable<FormData> {
    console.log("idem slattt")
    return this.http.post<FormData>(this.alignApiUrl, form, httpOptions);
  }

  sendMappingForm(form: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.mappingApiUrl, form);
  }


}

