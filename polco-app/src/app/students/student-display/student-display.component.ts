import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-display',
  templateUrl: './student-display.component.html',
  styleUrls: ['./student-display.component.css']
})
export class StudentDisplayComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  students: Student[] = [];
  average: number =  0;

  getStudents(): void {
    this.studentService.getStudents().subscribe(gottenStudents => {
      console.log(gottenStudents)
      this.students = gottenStudents.students
      console.log(this.students)
      // this.studentA = gottenStudents.students[0]
      // console.log(this.studentA)
    })
  }

  


  ngOnInit(): void {
    this.getStudents()
  }

}
