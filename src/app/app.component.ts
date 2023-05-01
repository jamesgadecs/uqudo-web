import { Component, OnInit } from '@angular/core';
import { UqudoserviceService } from './uqudoservice.service';
// import UqudoSdkFactory from 'uqudosdk-web';
// import {DocumentType} from 'uqudosdk-web'
import uqudoSdkFactory, { DocumentType } from '../assets/js/UqudoSDK';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sampleUqudo';
  token = '';

  constructor(private uqudoService: UqudoserviceService) {}

  ngOnInit(): void {
    this.getAccessToken();
  }

  getAccessToken() {
    this.uqudoService.getToken().subscribe((response) => {
      const data: any = response;
      this.token = data.payload.token;
      console.log(`TOKEN - ${this.token}`);
    });
  }

  async startEnrollment() {
    const sessionId = uuidv4();
    console.log('sessionId', sessionId);
    const uqudoSdk = uqudoSdkFactory.create({
      sessionId: sessionId,
      baseURL: 'https://id.dev.uqudo.io',
      accessToken: this.token,
    });

    try {
      const result = await uqudoSdk.enrollment({
        scan: {
          documentType: DocumentType.UAE_ID,
          disableExpiryValidation: true,
        },
        onSuccess: (result) => {
          this.uqudoService
            .getDataFromSessionId(sessionId)
            .subscribe((response) => {
              const data: any = response;
              const reqData = {
                front: data.payload.documents[0].scan.front,
                back: data.payload.documents[0].scan.back,
              }
              console.log(reqData);
            });
        },
      });
      console.log(result);
    } catch (error) {
      console.log('ERROR');
      console.log(error);
    }
  }
}
