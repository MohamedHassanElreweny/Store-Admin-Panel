import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  product:any={};
  id=0;
  images:any[]=[];
  constructor(public _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService) { }

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this._ProductService.GetProductById(this.id).subscribe({
      next:(data)=>{
        this.product=data;
      }
    });
    this.GetImages();
  }

  GetImages(){
    this._ProductService.getImages(this.id).subscribe({
      next:(data)=>{
        this.images = data;
      }
    })
  }
}
