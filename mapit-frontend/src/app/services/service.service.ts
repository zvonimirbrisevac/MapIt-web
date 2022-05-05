import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  reportProgress: true,
  observe: 'events'
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private alignApiUrl = '/api/align';
  private mappingApiUrl = '/api/mapping'


  constructor(private http: HttpClient) {
  }

  sendAlignForm(form: FormData): Observable<any> {//, refFile: File, queryFiles: File[]): Observable<any> {
    console.log("idem slattt")
;
    return this.http.post<any>(this.alignApiUrl, form,  {
      reportProgress: true,
      observe: 'events'
    }).pipe();
  }

  sendMappingForm(form: FormData): Observable<any> {
    return this.http.post<any>(this.mappingApiUrl, form,  {
      reportProgress: true,
      observe: 'events'
    }).pipe();
  }


}

