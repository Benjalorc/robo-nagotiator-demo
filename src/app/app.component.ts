import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('SideMenu') sideMenu: ElementRef;

  ngOnInit(){}

  toggleSide(){
    if(this.sideMenu.nativeElement.classList.contains("open")){
      this.sideMenu.nativeElement.classList.remove("open")
    }
    else{
      this.sideMenu.nativeElement.classList.add("open")
    }
  }
}