import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('AddInfo', {static: false}) addInfo: ElementRef;
  @ViewChild('FilePicker') filePicker: ElementRef;
  @ViewChild('SideMenu') sideMenu: ElementRef;
  title = 'robo-negotiator';
  alertPage: number = 1;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  isSmall: boolean;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
  	this.calcSize();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  calcSize(){
  	this.isSmall = window.innerWidth < 768 ? true : false;
  }

  setAlertPage(num){
  	this.addInfo.nativeElement.classList.remove("active-"+this.alertPage);
  	this.alertPage = num;
  	this.addInfo.nativeElement.classList.add("active-"+this.alertPage);
  }

  toggleSide(){
  	if(this.sideMenu.nativeElement.classList.contains("open")){
  		this.sideMenu.nativeElement.classList.remove("open")
  	}
  	else{
  		this.sideMenu.nativeElement.classList.add("open")
  	}
  }
}
