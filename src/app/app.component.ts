import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('AddInfo') addInfo: ElementRef;
  title = 'robo-negotiator';
  alertPage: number = 1;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  setAlertPage(num){
  	this.addInfo.nativeElement.classList.remove("active-"+this.alertPage);
  	this.alertPage = num;
  	this.addInfo.nativeElement.classList.add("active-"+this.alertPage);
  }
}
