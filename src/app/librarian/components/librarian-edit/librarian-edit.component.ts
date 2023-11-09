import { Component, OnInit } from '@angular/core';
import { Librarian } from '../../models/librarian.model';
import { LibrarianService } from '../../services/librarian.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createLibrarianForm } from '../../helpers/librarian-form.helper';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-librarian-edit',
  templateUrl: './librarian-edit.component.html',
  styleUrls: ['./librarian-edit.component.css'],
})
export class LibrarianEditComponent implements OnInit {
  librarian: Librarian;
  librarianEditForm: FormGroup;
  selectedImagePreviewUrl: string;
  uploadedImageUrlS3: string;
  selectedFile: File;
  imageUploaded: boolean = false;

  constructor(
    private librarianService: LibrarianService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.librarianEditForm = createLibrarianForm();
    const librarianId = +this.route.snapshot.paramMap.get('id');
    this.librarianService
      .loadLibrarian(librarianId)
      .subscribe((librarian: Librarian) => {
        this.librarian = librarian;

        this.librarianEditForm.patchValue({
          nameAndSurname: librarian.name + ' ' + librarian.surname,
          jmbg: librarian.jmbg,
          email: librarian.email,
          username: librarian.username,
          photoPath: librarian.photoPath,
        });
      });
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
          this.librarianEditForm
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
    if (this.librarianEditForm.valid && this.imageUploaded) {
      this.librarianService
        .saveLibrarian(this.librarianEditForm, this.librarian.id)
        .subscribe({
          next: (response) => {
            console.log('Uspješno sačuvano', response);
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            console.error('Greška', error);
          },
        });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
