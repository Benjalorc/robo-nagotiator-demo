import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('AddInfo') addInfo: ElementRef;
  title = 'robo-negotiator';
  alertPage: number = 1;

  ngOnInit(){

  }

  setAlertPage(num){
  	this.addInfo.nativeElement.classList.remove("active-"+this.alertPage);
  	this.alertPage = num;
  	this.addInfo.nativeElement.classList.add("active-"+this.alertPage);
  }
}
