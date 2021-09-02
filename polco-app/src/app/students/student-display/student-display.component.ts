import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student'
import { Student2 } from 'src/app/model/student2';

@Component({
  selector: 'app-student-display',
  templateUrl: './student-display.component.html',
  styleUrls: ['./student-display.component.css']
})
export class StudentDisplayComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  students: Student[] = [];
  mockStudents: Student2[] = [];
  average: number =  0;
  fullName: string = "";

  searchName: string = "";
  tagName: string = "";
  tags: string[] = [];
  filteredStudents: Student[] = [];
  filteredLength: number = 0;

  match: boolean = false;


  getStudents(): void {
    this.studentService.getStudents().subscribe(gottenStudents => {
      // console.log(gottenStudents)
      this.students = gottenStudents.students
      // console.log(this.students)
      this.getAverage()
      this.getFullName(this.students)
    })
  }

  getFullName(students: Student[]): void {
    for (let i = 0; i < this.students.length; i++) {
      this.students[i].fullName = this.students[i].firstName + " " + this.students[i].lastName
    }
  }

  filterStudents(): void {
    // console.log(this.searchName)
    this.filteredStudents = this.students.filter(student => student.fullName.toLowerCase().includes(this.searchName.toLowerCase()))
    // console.log (this.filteredStudents)
    this.filteredLength = this.filteredStudents.length
    this.getFullName(this.filteredStudents)
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
    }
  }

  openDetails(i:number): void {
    console.log("opened")
    console.log(i)
    this.students[i].isOpen = true
  }

  filteredOpenDetails(i:number): void {
    console.log("opened")
    console.log(i)
    this.filteredStudents[i].isOpen = true
  }

  closeDetails(i: number): void {
    console.log("closed")
    this.students[i].isOpen = false
  }

  filteredCloseDetails(i: number): void {
    console.log("closed")
    this.filteredStudents[i].isOpen = false;
  }

  getTag(i: number, value: string, name: string): void {
    this.tags.push(value)
    this.studentService.getMockStudents().subscribe(gottenStudents => {
      this.mockStudents = gottenStudents
      // console.log(this.mockStudents)

      if(this.mockStudents.length > 0) {
        let studentMatch = this.mockStudents.find(student => student.fullName == name);
        console.log(studentMatch)

        if(studentMatch) {
          console.log("match")
          console.log("tags:" ,studentMatch.tags)
          this.tags = studentMatch.tags
          this.tags.push(value)
          console.log("tags2:", this.tags)
          
          if(this.filteredStudents.length > 0) {
            this.filteredStudents[i].tags = this.tags
          } else {
            this.students[i].tags = this.tags
          }

          this.studentService.putTag(studentMatch.fullName, studentMatch.studentId, studentMatch.id, this.tags).subscribe(result => {
            console.log(result)
          })
          this.tags=[]

        }else {
          console.log("no match")
          console.log(this.tags)

          if(this.filteredStudents.length > 0) {
            this.filteredStudents[i].tags = this.tags
          } else {
            this.students[i].tags = this.tags
          }

          this.studentService.newPostTag(this.students[i].fullName, i + 1, this.tags).subscribe(gottenTag => {
            console.log(gottenTag)
          })
          this.tags=[]
        }
      }      
    })   
  }

  ngOnInit(): void {
    this.getStudents()
  }

}
