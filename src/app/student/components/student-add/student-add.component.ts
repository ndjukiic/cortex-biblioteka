import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { createStudentForm } from '../../helpers/student-form.helper';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent implements OnInit {
  studentAddForm: FormGroup;
  selectedImagePreviewUrl: string;
  uploadedImageUrlS3: string;
  selectedFile: File;
  imageUploaded: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.studentAddForm = createStudentForm();
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
          this.studentService.setUploadedImageUrl(this.uploadedImageUrlS3);
          this.studentAddForm
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
    if (this.studentAddForm.valid && this.imageUploaded) {
      this.studentService.saveStudent(this.studentAddForm).subscribe({
        next: (response) => {
          console.log('Uspješno sačuvano', response);
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Greška', error);
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/students']);
  }
}
