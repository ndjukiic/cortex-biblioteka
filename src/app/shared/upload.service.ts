import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private BUCKET = 'cortex-bucket-upload-photos';
  private REGION = 'eu-central-1';
  private ACCESS_KEY = 'AKIA3I34EWQKCUKCXFDD';
  private SECRET_KEY = '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';

  constructor() {
    AWS.config.update({
      accessKeyId: this.ACCESS_KEY,
      secretAccessKey: this.SECRET_KEY,
      region: this.REGION,
    });
  }

  uploadToS3(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const s3 = new AWS.S3();

      const params = {
        Bucket: this.BUCKET,
        Key: file.name,
        Body: file,
        ACL: 'public-read',
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log('Greska:', err);
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }

  // uploadMultipleToS3(files: FileList): Promise<string[]> {
  //   const s3 = new AWS.S3();
  //   const uploadPromises = [];
  
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const promise = new Promise<string>((resolve, reject) => {
  //       const params = {
  //         Bucket: this.BUCKET,
  //         Key: file.name,
  //         Body: file,
  //         ACL: 'public-read',
  //       };
  
  //       s3.upload(params, (err, data) => {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           console.log("File uploaded successfully. Location:", data.Location);
  //           resolve(data.Location);
  //         }
  //       });
  //     });
  //     uploadPromises.push(promise);
  //   }
  
  //   return Promise.all(uploadPromises);
  // }
  
  uploadMultipleToS3(files: { pictures: FileList }): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const s3 = new AWS.S3();
      const filesArray = Array.from(files.pictures);
      const imageUrls: string[] = [];
  
      filesArray.forEach((file, index) => {
        const params = {
          Bucket: this.BUCKET,
          Key: file.name,
          Body: file,
          ACL: 'public-read',
        };
  
        s3.upload(params, (err, data) => {
          if (err) {
            console.error(`Greška prilikom učitavanja slike ${file.name}: ${err}`);
            reject(err);
          } else {
            console.log(`Slika ${file.name} je uspešno učitana na S3`);
            imageUrls.push(data.Location);
  
            if (index === filesArray.length - 1) {
              console.log('Sve slike su uspešno učitane na S3');
              resolve(imageUrls);
            }
          }
        });
      });
    });
  }
  
  
  
  
}
