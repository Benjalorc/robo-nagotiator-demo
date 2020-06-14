import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  isSmall: boolean;
  products: any[];
  general: any;

  selected: string = "";
  active: any;

  marketDataPrice: any;
  offersPrice: any;
  closingOrientation: any;
  outputData: any;
  
  chartColors: any;

  constructor() {}

  ngOnInit(){

    this.setChartColors();
    this.setProducts();
  	this.calcSize();
  }

  setChartColors(){
    this.chartColors = {
      danger: "#dc3545",
      warning: "#ffc107",
      success: "#28a745",
      blue: "#17a2b8",
      purple: "#796b7e",
      grey: "#6c757d",
    };
  }

  setProducts(){

    this.general = {

      historical:{
        totalAmoutPastDeals: 0,
        averageNegotiationPrice: 0,
        totalDealsClosed: 0,
        totalQuantitySold: 0,
        settledInProbuyer: 0,
        settledInProSeller: 0
      },
      commonDemographic: {
        quantityDeals: 0,
        buyersAge: 0,
        buyersSex: 0,
        buyersIncomeRange: [50000, 100000]
      },
      individualDemographic: {
        sexOfBuyer: [],
        ethnicity: [],
        ageGroupBuyer: 0,
        incomeGroupBuyer: 0,
      }
    };

    this.products = [
      {
        name: "Product-1",
        image: "https://via.placeholder.com/250",
        marketData: {
          zipCode: 0,
          marketPrice: 35,
          averageSellingPrice: 50
        },
        offers: {
          minimumOffer: 25,
          averageOffer: 35,
          maximumOffer: 50
        },
        dealInteligence: {
          closedNeutrally: 20,
          closedProbuyer: 6,
          closedProseller: 12,
          probuyerOutput: 4,
          prosellerOutput: 10
        }
      },
    ];
  }

  calcSize(){
  	this.isSmall = window.innerWidth < 768 ? true : false;
  }

  setActive(selected){
    this.active = this.products.find((el)=> el.name === selected) || null;
    setTimeout(()=>{
      this.drawAllCharts(false);
    }, 100);
  }

  drawAllCharts(redraw){

    if(!redraw){

      this.drawMarketdataChart();
      this.drawOffersChart();
      this.drawClosingOrientationChart();
      this.drawOutputData();
    }
  }

  drawOutputData(){
/*
    let padre;
    let hijo = document.getElementById("marketDataPrice");
    if(this.outputData){
      padre = hijo.parentNode;
      padre.removeChild(hijo);
      document.createElement("canvas");
      canvas.setAttribute();
    }
*/
    var color = Chart.helpers.color;

    let a = this.active.dealInteligence.probuyerOutput;
    let b = this.active.dealInteligence.prosellerOutput;

    let compare = this.compareNumbers(b, a);

    let color1 = color(this.chartColors.blue).alpha(0.5).rgbString();
    let color2 = compare === "low" ? color(this.chartColors.danger).alpha(0.5).rgbString() : compare === "high" ? color(this.chartColors.success).alpha(0.5).rgbString() : color(this.chartColors.warning).alpha(0.5).rgbString();

    let data = {
      labels: ['Pro-Buyer Output', 'Pro-Seller Output'],
      datasets: [{
        label: '',
        backgroundColor: [color1, color2],
        borderWidth: 1,
        data: [
          a,
          b
        ]
      }]
    };
    let other = {
      aspectRatio: 1,
      title: {display: true, text: "Negotiation Output"}
    }

    this.outputData = this.drawChart('outputData', 'bar', data, other);
  }

  drawClosingOrientationChart(){

    var color = Chart.helpers.color;

    let color1 = color(this.chartColors.warning).alpha(0.5).rgbString();
    let color2 = color(this.chartColors.grey).alpha(0.5).rgbString();
    let color3 = color(this.chartColors.success).alpha(0.5).rgbString();

    let data = {
      labels: ['Pro-Buyer', "Neutral", "Pro-Seller"],
      datasets: [{
        label: "Distribution",
        bezierCurve: true,
        fill: false,
        backgroundColor: [color1, color2, color3],
        borderColor: [color1, color2, color3],
        borderWidth: 1,
        data: [
          this.active.dealInteligence.closedProbuyer,
          this.active.dealInteligence.closedNeutrally,
          this.active.dealInteligence.closedProseller
        ]
      }]
    };
    let other = {
      aspectRatio: 1,
      title: {display: true, text: "Closing Statics"},
    };
    this.closingOrientation = this.drawChart('closingOrientation', 'pie', data, other);
  }

  drawOffersChart(){

    var color = Chart.helpers.color;

    let color1 = color(this.chartColors.warning).alpha(0.5).rgbString();
    let color2 = color(this.chartColors.blue).alpha(0.5).rgbString();
    let color3 = color(this.chartColors.success).alpha(0.5).rgbString();

    let data = {
      labels: ['Minimun Offer', "Average Offer", "Maximum Offer"],
      datasets: [{
        label: "Distribution",
        bezierCurve: true,
        fill: false,
        backgroundColor: [color1, color2, color3],
        borderColor: [color1, color2, color3],
        borderWidth: 1,
        data: [
          this.active.offers.minimumOffer,
          this.active.offers.averageOffer,
          this.active.offers.maximumOffer
        ]
      }]
    };
    let other = {
      aspectRatio: 2,
      title: {display: true, text: "Product Offers"},
    };
    this.offersPrice = this.drawChart('offersPrice', 'bar', data, other);
  }

  compareNumbers(b, a){

    let range = a*0.10;
    let a_high = a+range, a_low = a-range;

    if(b < a_low){
      return "low";
    }
    else if(b > a_high){
      return "high";
    }
    else{
      return "avg";
    }
  }

  drawMarketdataChart(){

    var color = Chart.helpers.color;
    let a = this.active.marketData.marketPrice;
    let b = this.active.marketData.averageSellingPrice;

    let compare = this.compareNumbers(b, a);
    console.log(compare);

    let color1 = color(this.chartColors.blue).alpha(0.5).rgbString();
    let color2 = compare === "low" ? color(this.chartColors.danger).alpha(0.5).rgbString() : compare === "high" ? color(this.chartColors.success).alpha(0.5).rgbString() : color(this.chartColors.warning).alpha(0.5).rgbString();

    let data = {
      labels: ['Market Price', 'Average Selling Price'],
      datasets: [{
        label: '',
        backgroundColor: [color1, color2],
        borderWidth: 1,
        data: [
          a,
          b
        ]
      }]
    };
    let other = {
      aspectRatio: 1,
      title: {display: true, text: "Market Data"}
    }
    this.marketDataPrice = this.drawChart('marketDataPrice', 'bar', data, other);
  }

  drawChart(id, type, data, other) {

    return new Chart(id, {
      type: type,
      data: data,
      options: {
        ...other,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: (type === "pie" ? false : true)
          }],
          yAxes: [{
            display: (type === "pie" ? false : true),
            ticks: {
                beginAtZero: true
            }
          }],
        }
      }
    });
  }

}
