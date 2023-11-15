import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from 'src/app/book/services/form-data.service';

@Component({
  selector: 'app-book-add-multimedia',
  templateUrl: './book-add-multimedia.component.html',
})
export class BookAddMultimediaComponent implements OnInit {
  @Output() previousClickedFromMultimedia = new EventEmitter<void>();
  @Output() submitClicked = new EventEmitter<void>();
  bookAddForm: FormGroup;
  selectedImagePreviewUrls: string[] = [];

  constructor(private formDataService: FormDataService) {}

  ngOnInit(): void {
    this.bookAddForm = new FormGroup({
      pictures: new FormControl(null, [Validators.required]),
    });
    const formDataMultimedia = this.formDataService.getFormDataMultimedia();
    if (formDataMultimedia && formDataMultimedia.pictures) {
      const files = formDataMultimedia.pictures;
      this.selectedImagePreviewUrls = [];
      for (let i = 0; i < files.length; i++) {
        const imageUrl: string = URL.createObjectURL(files[i]);
        this.selectedImagePreviewUrls.push(imageUrl);
      }
      this.bookAddForm.get('pictures').setValue(files);
    }
  }

  displaySelectedImage(event: any) {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      this.selectedImagePreviewUrls = [];
  
      for (let i = 0; i < files.length && i < 3; i++) {
        const file = files[i];
        const imageUrl: string = URL.createObjectURL(file);
        this.selectedImagePreviewUrls.push(imageUrl);
        this.bookAddForm.get('pictures').setValue(files);
      }
      this.formDataService.setFormDataMultimedia({ pictures: files });
      console.log(this.formDataService.getFormDataMultimedia())
    }
  }

  onImageRadioChange(index: number) {
    const selectedImage = this.selectedImagePreviewUrls[index];
    const imagesData = this.formDataService.getFormDataMultimedia()?.pictures;
  
    if (Array.isArray(imagesData)) {
      imagesData.forEach((image: any) => {
        image.isSelected = (image === selectedImage);
      });
  
      this.formDataService.setFormDataMultimedia({ pictures: imagesData });
    }
  }

  onSubmitClick() {
    this.submitClicked.emit();
  }
  
  onPreviousClick() {
    this.previousClickedFromMultimedia.emit();
    this.formDataService.setFormDataMultimedia(this.bookAddForm.value);
  }
}
