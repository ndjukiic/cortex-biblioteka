import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/book/services/book.service';
import { FormDataService } from 'src/app/book/services/form-data.service';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
})
export class BookAddComponent {
  visibleComponent = 1;
  newBookForm: FormGroup;
  isnewBookFormValid: boolean = false;
  uploadedImageUrlS3: string[];
  imageUrls: any;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService,
    private formDataService: FormDataService
  ) {}

  showDetails() {
    this.visibleComponent = 1;
  }

  showSpecs() {
    this.visibleComponent = 2;
  }

  onGoBackFromSpecs() {
    this.visibleComponent = 1;
  }

  showMultimedia() {
    this.visibleComponent = 3;
  }

  submitForm() {
    const imagesToUpload = this.formDataService.formDataMultimediaComponent;
    if (imagesToUpload) {
      this.uploadService
        .uploadMultipleToS3(imagesToUpload)
        .then((imageUrls) => {
          const bookData = {
            nazivKnjiga: this.formDataService.formDataDetailComponent.nazivKnjiga,
            kratki_sadrzaj: this.formDataService.formDataDetailComponent.kratki_sadrzaj,
            categories: this.formDataService.formDataDetailComponent.categories,
            genres: this.formDataService.formDataDetailComponent.genres,
            authors: this.formDataService.formDataDetailComponent.authors,
            izdavac: this.formDataService.formDataDetailComponent.izdavac,
            godinaIzdavanja: this.formDataService.formDataDetailComponent.godinaIzdavanja,
            knjigaKolicina: this.formDataService.formDataDetailComponent.knjigaKolicina,
            jezik: this.formDataService.formDataDetailComponent.jezik,
            deletePdfs: this.formDataService.formDataDetailComponent.deletePdfs,
            brStrana: this.formDataService.formDataSpecsComponent.brStrana,
            pismo: this.formDataService.formDataSpecsComponent.pismo,
            povez: this.formDataService.formDataSpecsComponent.povez,
            format: this.formDataService.formDataSpecsComponent.format,
            isbn: this.formDataService.formDataSpecsComponent.isbn,
            pictures: imageUrls.map((imageUrl, index) => [imageUrl,index === 0,]),
          };
          console.log(bookData);
          this.bookService.addBook(bookData).subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (error) => {
              console.error('Greška', error);
            },
          });
        });
    }
  }
}
