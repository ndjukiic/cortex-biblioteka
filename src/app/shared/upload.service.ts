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
}
