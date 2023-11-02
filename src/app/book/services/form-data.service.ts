import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  public formDataDetailComponent: any;
  public formDataSpecsComponent: any;
  public formDataMultimediaComponent: any;

  constructor() { }

  setFormDataDetails(data: any) {
    this.formDataDetailComponent = data;
  }

  getFormDataDetails() {
    return this.formDataDetailComponent;
  }

  setFormDataSpecs(data: any) {
    this.formDataSpecsComponent = data;
  }

  getFormDataSpecs() {
    return this.formDataSpecsComponent;
  }

  setFormDataMultimedia(data: any) {
    this.formDataMultimediaComponent = data;
  }

  getFormDataMultimedia() {
    return this.formDataMultimediaComponent;
  }
}
