import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { BrandService } from '../brand.service';
import { Product } from '../product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories:Category[]=[];
  brands:any[]=[];

  images:any[]=[];
  productforupdate:any={};
  selectedcategory = null;
  selectedbrand=null;

  @ViewChild('closeModal') closeModal: ElementRef<any> | undefined;

  term:string='';
  productform:FormGroup=new FormGroup({
    'name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'description':new FormControl(null,[Validators.required,Validators.maxLength(400)]),
    'price':new FormControl(null,[Validators.required,Validators.pattern(/\d+(?:[.,]\d{0,2})?/)]),
    'stock':new FormControl(null,Validators.required),
    'size':new FormControl(null),
    'weight':new FormControl(null),
    'discount':new FormControl(null),
    'date_First_Available':new FormControl(null , Validators.required),
    'brandId':new FormControl(null,[Validators.required]),
    'categoryId':new FormControl(null,[Validators.required]),
    'PrimaryImage':new FormControl(null,[Validators.required]),
  });



  products:Product[]=[];
  CurrnetID:number=0;
  currentproduct:any=null;

  collection:string[] = [];
  p:number=0;
  constructor(private _ProductService:ProductService ,private _Router:Router,private _BrandService:BrandService , private _CategoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.GetAllProducts();
    this.GetAllCategories();
    this.GetAllBrands();
  }


  GetCurrentId(id:number){
    this.CurrnetID = id;
    this.currentproduct = this.products.find(x=>x.productId == id);
  }


  productsForDisplay:Product[]=[];
  GetAllProducts(){
    this._ProductService.GetAllProducts().subscribe({
      next:(data)=>{
        this.products=[];
        // this.productsForDisplay=[];
        // this.products= data;
        // for (let i = 0; i < this.products.length; i++) {
        //   this.productsForDisplay.push(this.products[i]);
        // }
        for (let i = 0; i < data.length; i++) {
          this.products.push(data[i]);
        }
      }
    })
  }

  AddProduct(data:FormGroup){
    if(this.productform.invalid) return;
    let object={
      'name': data.value.name,
      'description':data.value.description,
      'price':data.value.price,
      'stock':data.value.stock,
      'size':data.value.size,
      'weight':data.value.weight,
      'discount':data.value.discount,
      'date_First_Available':data.value.date_First_Available,
      'brandId':data.value.brandId,
      'categoryId':data.value.categoryId,
    }
    // let validObj = this.MakeObjValid(object);
    this._ProductService.AddProduct(object).subscribe({
      next:(data)=>{
        for(let i=0;i<this.images.length;i++){
          let imageObj={
            'Url':this.images[i][0],
            // 'ProductFK':data[data.length-1].productId,
            'ProductFK':data.productId,
          }
          this._ProductService.addProductImages(imageObj).subscribe({
            next:()=>{
              this.GetAllProducts();
              this.productform.reset();
            }
          });
        }
        // this.GetAllProducts();
        // this.productform.reset();
        this.closeModal?.nativeElement.click();
        // document.getElementById("closeModalButton").click();
      }
    })
  }


  DeleteProduct(){
    this._ProductService.DeleteProduct(this.CurrnetID).subscribe({
      next:(data)=>{
        this.GetAllProducts();
        console.log(data);
      }
    })
  }

  uploadPhoto(target:any){

    if(!target || !target.files) return;
    var input = target as HTMLInputElement;
    if(!input.files) return;
    this.images = [];
    for(var i=0;i<input.files.length;i++){

      this._ProductService.uploadImage(input.files[i]).subscribe({
        next:(data)=>{
          this.productform.patchValue({PrimaryImage : data._url[0]});

          this.images.push(data._url)
        },
        error:(err)=>{
          console.log(err.error);
        }
      })

    }
  }

    sendProductForUpdate(_id:any){
      this.productforupdate = this.products.find(x=>x.productId==_id);
      this._Router.navigate(['/updateProduct'] , { state: { example: this.productforupdate } });
    }

    getdetails(id:any){
      this.CurrnetID=id;
      this._Router.navigate([`userDetails/${id}`])
    }

    GetAllCategories(){
      this._CategoryService.GetAllCategories().subscribe({
        next:(data)=>{
          this.categories= data;

        }
      })
    }

    GetAllBrands(){
      this._BrandService.GetAllBrands().subscribe({
        next:(data)=>{
          this.brands= data;
        }
      })
    }

    test:object={
      name:'mohamed',
      age:28,
      address:null,
    }

    // make the object valid to send
    MakeObjValid(oldobject:object):object{
      const arr = Object.entries(oldobject);
      const newarr = arr.map(item=>item.filter(x=>x!=null));
      const validObj = Object.fromEntries(newarr.filter(x=>x.length==2));
      return validObj;
    }


}
