import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/data-form',
    // 'Access-Control-Allow-Origin': *,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private alignApiUrl = '/api/align';
  private mappingApiUrl = '/api/mapping'


  constructor(private http: HttpClient) {
  }

  // sendAlignForm(form: FormData): Observable<FormData> {
  //   console.log("idem slattt")
  //   return this.http.post<FormData>(this.alignApiUrl, form, httpOptions);
  // }

  sendAlignForm(form: FormData) {//, refFile: File, queryFiles: File[]): Observable<any> {
    console.log("idem slattt")
    // const params = new HttpParams()
    //   .append('refFile', refFile)
    //   .append('param2', 'some data 2');
    return this.http.post<any>(this.alignApiUrl, form)//, httpOptions);
  }

  sendMappingForm(form: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.mappingApiUrl, form);
  }


}

