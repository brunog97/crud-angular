import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
    // Um grupo de form
    form: FormGroup;
    constructor(private formBuilder: FormBuilder, private serviceCourse: CoursesService ){
      this.form = this.formBuilder.group({
        name: [null],
        category: [null]
      });
    }

    onSubmit(){
      this.serviceCourse.save(this.form.value).subscribe({
        next: (result) => console.log(result),
        error(err) {
            console.log(err);
        },
      });
    }

    onCancel(){}
}
