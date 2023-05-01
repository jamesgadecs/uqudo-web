import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UqudoserviceService {

  constructor(private http: HttpClient) { }

  API_URL = "http://uqudoapp.de.r.appspot.com/api/v1";

  getToken() {
    return this.http.get(`${this.API_URL}/token`);
  }

  getDataFromSessionId(sessionId: string){
    return this.http.get(`${this.API_URL}/session`, {
      params: {
        sessionId: sessionId
      }
    });
  }

}
