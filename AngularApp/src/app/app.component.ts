import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularApp';

  studentArray:any = null;
  studentUpdate={
    id:" ",
    name:" ",
    address:" ",
    percentage:" "
  };

  constructor(private studentService: StudentService){
    this.getStudentsDetails();
   }
  register(registerForm: NgForm){
    this.studentService.registerStudent(registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        registerForm.reset();
        this.getStudentsDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStudentsDetails(){
    this.studentService.getStudents().subscribe(
      (resp)=>{
        console.log(resp);
        this.studentArray = resp;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  deleteStudent(student: any){
    this.studentService.deleteStudent(student.id).subscribe(
      (resp)=>{
        console.log(resp);
        this.getStudentsDetails();
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  update(student: any){
    this.studentUpdate=student;
  }

  updateStudent(){
    this.studentService.updateStudent(this.studentUpdate).subscribe(
      (resp)=>{
        console.log(resp);
      },
      (err)=>{
        console.log(err);}
    );
  }
}
