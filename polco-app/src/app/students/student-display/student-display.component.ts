import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/models/student'

@Component({
  selector: 'app-student-display',
  templateUrl: './student-display.component.html',
  styleUrls: ['./student-display.component.css']
})
export class StudentDisplayComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  students: Student[] = [];
  average: number =  0;
  fullName: string = "";

  searchName: string = "";
  tagName: string = "";
  addedTag: string = "";
  tags: string[] = [];
  filteredStudents: Student[] = [];
  filteredLength: number = 0;


  getStudents(): void {
    this.studentService.getStudents().subscribe(gottenStudents => {
      console.log(gottenStudents)
      this.students = gottenStudents.students
      console.log(this.students)
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
    console.log(this.searchName)
    this.filteredStudents = this.students.filter(student => student.fullName.toLowerCase().includes(this.searchName.toLowerCase()))
    console.log (this.filteredStudents)
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
    this.students[i].isOpen = false;
  }

  filteredCloseDetails(i: number): void {
    console.log("closed")
    this.filteredStudents[i].isOpen = false;
  }

  getTag(i: number, value: string): void {
    this.students[i].tags = []
    console.log(this.students[i].tags)
    this.students[i].tags.push(value)
    // this.tags.push(value)
    // console.log(this.tags)
    // this.students[i].tags.push(...this.tags) 
    // this.tags = []

    
  }

  // addTags(i: number): void {
  //   let timeout: any = null;
  //   clearTimeout(timeout);
  //   timeout = setTimeout(() => {
  //     this.students[i].tags.push(this.addedTag)
  //     console.log("Tag:", this.students[i].tags)
  //   }, 2000);
  // }
  

  ngOnInit(): void {
    this.getStudents()
  }

}
