import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BrandService } from '../brand.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products:Product[]=[];
  categories:Category[]=[];
  CategoriesNames:any[]=[]
  brands:any[]=[];
  constructor(private _ProductService:ProductService , private _CategoryService:CategoryService ,private _BrandService:BrandService) {
    this.categories=this._CategoryService.categories.getValue();
    
   }

  ngOnInit(): void {

    for(let i=0;i<this.categories.length;i++){
      this.CategoriesNames.push(this.categories[i].name);
    }
    console.log(this.categories.length);
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: BaseChartDirective["labels"] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  // barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  // barChartLabels: BaseChartDirective["labels"] = this.CategoriesNames;
  // barChartLabels: BaseChartDirective["labels"] = [this.CategoriesNames[0], 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  // barChartLabels = this.categories;


  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [
    // { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
    { data: [45, 37, 60, 70,50,22], label: 'Categories' }
  ];

  GetAllProducts(){
    this._ProductService.GetAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
        console.log(this.products);
      }
    })
  }

  // GetAllCategories(){
  //   this._CategoryService.GetAllCategories().subscribe({
  //     next:(data)=>{
  //       this.categories= data;
  //       console.log(this.categories);
  //       for(let i =0; i<this.categories.length;i++){
  //         this.CategoriesNames.push(this.categories[i].name)
  //       }
  //       console.log(this.CategoriesNames);

  //     }
  //   })
  // }

  GetAllBrands(){
    this._BrandService.GetAllBrands().subscribe({
      next:(data)=>{
        this.brands= data;
        console.log(this.brands);
      }
    })
  }

}
