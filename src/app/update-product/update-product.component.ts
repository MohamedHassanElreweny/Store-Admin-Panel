import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from '../brand.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {


  product:any={};
  categories:Category[]=[];
  brands:any[]=[];
  selectedcategory = null;
  selectedbrand=null;
  images:any[]=[];
  productImages:any[]=[];
  productUpdateform:FormGroup=new FormGroup({
    'name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
    'description':new FormControl(null,[Validators.required,Validators.maxLength(400)]),
    'price':new FormControl(null,[Validators.required,Validators.pattern(/\d+(?:[.,]\d{0,2})?/)]),
    'stock':new FormControl(null,Validators.required),
    'size':new FormControl(null),
    'weight':new FormControl(null),
    'discount':new FormControl(null),
    'date_First_Available':new FormControl(null,[Validators.required]),
    'brandId':new FormControl(null,[Validators.required]),
    'categoryId':new FormControl(null,[Validators.required]),
    'PrimaryImage':new FormControl(null),
  });

  constructor(private _Router:Router, private _ProductService:ProductService ,private _CategoryService:CategoryService ,private _BrandService:BrandService) {
    this.product= this._Router.getCurrentNavigation()?.extras.state?.['example'];
    console.log(this.product);

    this.GetImages();
  }

  ngOnInit(): void {
    this.GetAllBrands();
    this.GetAllCategories();
    this.productUpdateform.get('name')?.setValue(this.product?.name);
    this.productUpdateform.get('price')?.setValue(this.product?.price);
    this.productUpdateform.get('discount')?.setValue(this.product?.discount);
    this.productUpdateform.get('size')?.setValue(this.product?.size);
    this.productUpdateform.get('weight')?.setValue(this.product?.weight);
    this.productUpdateform.get('stock')?.setValue(this.product?.stock);
    this.productUpdateform.get('brandId')?.setValue(this.product?.brands);
    this.productUpdateform.get('categoryId')?.setValue(this.product?.categoryId);
    this.productUpdateform.get('description')?.setValue(this.product?.description);
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

  UpdateProduct(data:FormGroup){
    if(this.productUpdateform.invalid) return;
    let obj={
      'productId':this.product.productId,
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
    this._ProductService.UpdateProduct(this.product.productId,obj).subscribe({
      next:(data)=>{
        console.log(data);

        for(let i=0;i<this.images.length;i++){
          let imageObj={
            'Url':this.images[i][0],
            // 'ProductFK':data[data.length-1].productId,
            'ProductFK':this.product.productId,
          }
          this._ProductService.addProductImages(imageObj).subscribe({
            next:()=>{
              this._Router.navigate(['/productDetails/'+this.product.productId])
            }
          });
        }
        this._Router.navigate(['/productDetails/'+this.product.productId])
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
          this.productUpdateform.patchValue({PrimaryImage : data._url[0]});

          this.images.push(data._url);
          console.log(this.images);

        },
        error:(err)=>{
          console.log(err.error);
        }
      })

    }
  }

  GetImages(){
    this._ProductService.getImages(this.product.productId).subscribe({
      next:(data)=>{
        this.productImages = data;
      }
    })
  }

  DeleteImage(id:number){
    this._ProductService.DeleteImage(id).subscribe({
      next:()=>{
        this.GetImages();
      },
      error:()=>{
      }
    })
  }
}
