import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { createStudentForm } from '../../helpers/student-form.helper';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  student: Student;
  studentEditForm: FormGroup;
  selectedImagePreviewUrl: string;
  uploadedImageUrlS3: string;
  selectedFile: File;
  imageUploaded: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.studentEditForm = createStudentForm();
    const studentId = +this.route.snapshot.paramMap.get('id');
    this.studentService.loadStudent(studentId).subscribe((student: Student) => {
      this.student = student;

      this.studentEditForm.patchValue({
        nameAndSurname: student.name + ' ' + student.surname,
        jmbg: student.jmbg,
        email: student.email,
        username: student.username,
        photoPath: student.photoPath,
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
          this.studentService.setUploadedImageUrl(this.uploadedImageUrlS3);
          this.studentEditForm
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
    if (this.studentEditForm.valid && this.imageUploaded) {
      this.studentService
        .saveStudent(this.studentEditForm, this.student.id)
        .subscribe({
          next: (response) => {
            console.log('Uspješno sačuvano', response);
            this.router.navigate(['../details'], { relativeTo: this.route });
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
