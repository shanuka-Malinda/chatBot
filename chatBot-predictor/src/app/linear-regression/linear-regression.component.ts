import { Component, OnInit } from '@angular/core';
import { DataHandleService } from '../service/data-handle.service';

@Component({
  selector: 'app-linear-regression',
  templateUrl: './linear-regression.component.html',
  styleUrls: ['./linear-regression.component.scss']
})
export class LinearRegressionComponent implements OnInit {
  constructor(private dh: DataHandleService) { }
  myData: any = [];

  //-------------------------------------------------------------

  xValues: number[] = this.dh.jsonData.map((item: { x: number, y: number }) => item.x);
  xValuesLength: number = this.xValues.length;
  yValues: number[] = this.dh.jsonData.map((item: { x: number, y: number }) => item.y);
  yValuesLength: number = this.yValues.length;

  sumX: number = this.xValues.reduce((total, num) => total + num, 0);
  sumY: number = this.yValues.reduce((total, num) => total + num, 0);

  //-----------x' and y'-------------------------
  X = this.sumX / this.xValuesLength;
  Y = this.sumY / this.yValuesLength;

  //------x-x' and y-y'-----values
  xXvalues: number[] = [];
  yYvalues: number[] = [];

  //----------(x-x')(y-y')----------
  xxSubyy: number[] = [];
  sumxxyy: number = 0;
  L: number = this.xValuesLength - 1;
  COVxy: number = 0;
  oooo() {
    for (let i = 0; i < this.xxSubyy.length; i++) {
      this.sumxxyy = this.sumxxyy + this.xxSubyy[i];
    }
    this.COVxy = this.sumxxyy / this.L;
  }
  //S^2-------------------------------------------
  SS: number= 0;
  sbys() {
    let x = 0;
     //E(x-x')^2
    for (let index = 0; index < this.xXvalues.length; index++) {
      x = x + (this.xXvalues[index] * this.xXvalues[index]);
    }
    this.SS=x/this.L;
  }
  //////////////////////////////////////////////////////
  xX() {
    for (let i = 0; i < this.xValues.length; i++) {
      this.xXvalues.push(this.xValues[i] - this.X);
    }
    console.log(this.xXvalues);
  }
  yY() {
    for (let i = 0; i < this.yValues.length; i++) {
      this.yYvalues.push(this.yValues[i] - this.Y);
    }
    console.log(this.xxSubyy);
  }
  /////////////////////////////////////////////////////
  xxSuByy() {
    for (let index = 0; index < this.xXvalues.length; index++) {
      this.xxSubyy.push(this.xXvalues[index] * this.yYvalues[index]);
    }
    console.log("(x-x')(y-y')=" + this.xxSubyy);
  }
  /////////////////set graph function//////////////////////
  b1:number=0;
  b2:number=0;
  setGraph(){
    this.b1=this.COVxy/this.SS;
    this.b2=this.Y-(this.b1*this.X);
  }
  /////////////////////////////////////////////////////////
  ngOnInit(): void {
    //this.getDataset();
    this.xX();
    this.yY();
    this.xxSuByy();
    this.oooo();
    this.sbys();
    this.setGraph();
    console.log("EXi" + this.sumX);
    console.log("EYi" + this.sumY);
    console.log(this.xXvalues);
    console.log(this.yYvalues);

  }
  // getDataset() {
  //   this.dh.getData().subscribe(data => {
  //     this.myData = data;
  //   });
  // }

}
