import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CallService } from '../call.service';
import { UserComponent } from '../user/user.component';
import { User } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,HttpClientModule,UserComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _call:CallService) { }
  @ViewChild('no') reject!:ElementRef;
  @ViewChild('yes') accept!:ElementRef;
  @ViewChild('pending') pending!:ElementRef;
  @ViewChild('cstm') cstm!:ElementRef;
  studentId:string="";
  isvalid:boolean=false;
  hiderule:boolean = true;
  userid!:string
  username!:string
  useremail!:string
  userimg!:string
  apirespons:any
  list!:User[]
  list2!:User[]
  alertmsg!:string


  ngAfterViewInit() {

    this.hideall();

  }

  checkvalidty(){
    if(/^\d{14}$/.test(this.studentId))
    {
      this.isvalid = true;
      // this.hiderule = true;
    }
    else{
      this.isvalid = false;
    }
  }

  hideall()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.add('d-none');
    this.cstm.nativeElement.classList.add('d-none');
  }

  rejected()
  {
    this.reject.nativeElement.classList.remove('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.add('d-none');
    this.cstm.nativeElement.classList.add('d-none');
  }
  accepted()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.remove('d-none');
    this.pending.nativeElement.classList.add('d-none');
    this.cstm.nativeElement.classList.add('d-none');
  }

  pended()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.remove('d-none');
    this.cstm.nativeElement.classList.add('d-none');
  }
  cstmed()
  {
    this.reject.nativeElement.classList.add('d-none');
    this.accept.nativeElement.classList.add('d-none');
    this.pending.nativeElement.classList.add('d-none');
    this.cstm.nativeElement.classList.remove('d-none');
  }

  rules(){
    this.hiderule = !this.hiderule;
  }

  ask()
  {
    console.log(this.studentId);
    this._call.callidapi(this.studentId).subscribe({
      next:(resdata)=>{
        this.apirespons=resdata;
        // this.accepted();
        console.log(resdata);
        if (this.apirespons === "لم يستدل عليه") {
          this.pended()
        }
        else if(this.apirespons === "Not Found")
        {
          this.rejected()
        }
        else if(this.apirespons === "مقبول")
        {
          this.accepted()
        }
        else{
          this.alertmsg = this.apirespons
          this.cstmed()
        }
      },
      error:(errdata)=>{
        console.log(errdata);
        this.rejected();
      }
    })
  }
}
