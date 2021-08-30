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
      this.getAverage()
    })
  }

  getAverage(): void {
    for (let i = 0; i < this.students.length; i++) {
      let total: number = 0;
      let gLength: number = this.students[i].grades.length;
      for (let j = 0; j < gLength; j++) {
        let grade: number = Number(this.students[i].grades[j])
        total += grade
      }
      let average: number = total / gLength
      this.students[i].average = average
      console.log(this.students[i].grades)
      console.log(total)
      console.log(this.students[i].average)
    }
  }

  ngOnInit(): void {
    this.getStudents()
  }

}
