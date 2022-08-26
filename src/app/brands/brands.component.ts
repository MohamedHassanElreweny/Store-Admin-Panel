import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef<any> | undefined;

  term:string='';
  brands:any[]=[];
  currentID:number=0;
  currentBrand:any=null;

  constructor(private _BrandService:BrandService) { }

  BrandForm:FormGroup=new FormGroup({
    'Name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
  })

  BrandUpdateForm:FormGroup=new FormGroup({
  'Name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
  })

  ngOnInit(): void {
    this.GetAllBrands();
  }

  GetCurrentId(id:number){
    this.currentID = id;
    this.currentBrand = this.brands.find(x=>x.id == id);
    this.BrandUpdateForm.get('Name')?.setValue(this.currentBrand?.name);
  }

  GetAllBrands(){
    this._BrandService.GetAllBrands().subscribe({
      next:(data)=>{
        this.brands= data;
      }
    })
  }

  AddBrand(data:FormGroup){
    if(this.BrandForm.invalid) return;
    let object={
      'Name': data.value.Name,
    }
    this._BrandService.AddBrand(object).subscribe({
      next:()=>{
        this.GetAllBrands();
        this.BrandForm.reset();
        this.closeModal?.nativeElement.click();
        // document.getElementById("closeModalButton").click();
      }
    })
  }

  UpdateBrand(data:FormGroup){
    if(this.BrandUpdateForm.invalid) return;
    let obj={
      'id':this.currentID,
      'name': data.value.Name,
    }
    this._BrandService.UpdateBrand(this.currentID,obj).subscribe({
      next:()=>{
        this.GetAllBrands();
      }
    })
  }

  DeleteBrand(){
    this._BrandService.DeleteBrand(this.currentID).subscribe({
      next:(data)=>{
        this.GetAllBrands();
      }
    })
  }

}
