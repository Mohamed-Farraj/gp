import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CallService } from '../call.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,HttpClientModule,UserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _call:CallService) { }
  @ViewChild('no') reject!:ElementRef;
  @ViewChild('yes') accept!:ElementRef;
  @ViewChild('pending') pending!:ElementRef;
  studentId:string="";
  userid!:string
  username!:string
  useremail!:string
  userimg!:string
  apirespons:any
  ngAfterViewInit() {

    this.hideall();

  }

  hideall()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.add('d-none');
  }

  rejected()
  {
    this.reject.nativeElement.classList.remove('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.add('d-none');
  }
  accepted()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.remove('d-none');
    this.pending.nativeElement.classList.add('d-none');
  }

  pended()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.remove('d-none');
  }

  ask()
  {
    console.log(this.studentId);
    this._call.callidapi(this.studentId).subscribe({
      next:(resdata)=>{
        this.apirespons=resdata;
        // this.accepted();
        this.hideall();
        console.log(this.apirespons);
        this.userid = this.apirespons.data.id
        this.username= this.apirespons.data.first_name +" "+ this.apirespons.data.last_name
        this.useremail= this.apirespons.data.email
        this.userimg=this.apirespons.data.avatar
      },
      error:(errdata)=>{
        this.userid=""
        this.rejected();
      }
    })
  }
}
