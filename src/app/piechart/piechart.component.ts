import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ChartService } from '../chart.service';


@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor(private service:ChartService) {


  }
  disp1: boolean=true;
  disp2: boolean=false;

  toggle(){
    this.disp1=!this.disp1;
    this.disp2=!this.disp2;
  }

  chartdata:any;
  labeldata:any[]=[];
  realdata:any[]=[];

  ngOnInit(): void {
    this.service.Getchartinfo().subscribe(result =>{
      this.chartdata=result;
      if(this.chartdata!=null){
        for(let i=0;i<this.chartdata.length;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].result)
          this.realdata.push(this.chartdata[i].amount)
        }
      }
    });
    //console.log(this.realdata);
    //console.log(this.labeldata);
    this.Renderchart1(this.labeldata,this.realdata,'pie','piechart');
    //this.Renderchart(this.labeldata,this.realdata,'bar','piechart1');
  }
  Renderchart1(labeldata:any,realdata:any,type:any,id:any){
    console.log(realdata);
    console.log(labeldata);
    var myChart = new Chart(id, {
      type: type,
      data: {
          labels: ['Pass','Fail'],
          datasets: [{
              label: labeldata,
              data: realdata,
              backgroundColor:['rgba(54, 162, 235, 1)',
                               'rgba(255, 99, 132, 1)'],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',

              ],
              borderWidth: 1
          }]
      },
      options: {

          title: {
             display: true,
             fontsize: 14,
             text: 'Test Result'
         },
         legend: {
             display: true,
             position: 'bottom',

         },
         responsive: false,


        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
          }
        },
      }
  });
  }
}
