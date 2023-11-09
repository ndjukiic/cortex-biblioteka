import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LibrarianService } from '../../services/librarian.service';
import { createLibrarianForm } from '../../helpers/librarian-form.helper';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-librarian-add',
  templateUrl: './librarian-add.component.html',
  styleUrls: ['./librarian-add.component.css'],
})
export class LibrarianAddComponent implements OnInit {
  librarianAddForm: FormGroup;
  selectedImagePreviewUrl: string;
  uploadedImageUrlS3: string;
  selectedFile: File;
  imageUploaded: boolean = false;

  constructor(
    private librarianService: LibrarianService,
    private router: Router,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.librarianAddForm = createLibrarianForm();
  }

  displaySelectedImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.selectedImagePreviewUrl = imageUrl;
      this.selectedFile = file;
    }
  }

  uploadToS3() {
    if (this.selectedFile) {
      this.uploadService
        .uploadToS3(this.selectedFile)
        .then((imageUrl) => {
          this.uploadedImageUrlS3 = imageUrl;
          this.librarianService.setUploadedImageUrl(this.uploadedImageUrlS3);
          this.librarianAddForm
            .get('photoPath')
            .setValue(this.uploadedImageUrlS3);
          this.imageUploaded = true;
          this.onSubmit();
        })
        .catch((error) => {
          console.error('Greška pri upload-u na S3:', error);
        });
    }
  }

  onSubmit() {
    if (this.librarianAddForm.valid && this.imageUploaded) {
      this.librarianService.saveLibrarian(this.librarianAddForm).subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.router.navigate(['/librarians']);
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/librarians']);
  }
}
