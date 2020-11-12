import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/services/api/course/crouse.service';
import { Course } from './course.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  courseForm: FormGroup;
  courses: Course;
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      bootcampId: new FormControl('5d713995b721c3bb38c1f5d0'),
    });

    this.courseService.getCourses().subscribe((course) => {
      this.courses = course['data'];
    });
  }

  onSubmit() {}
}
