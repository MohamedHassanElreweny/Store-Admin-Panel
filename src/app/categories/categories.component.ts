import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoryService:CategoryService) {

  }

  @ViewChild('closeModal') closeModal: ElementRef<any> | undefined;

  categories:Category[]=[];

  CurrnetID:number=0;

  currentCategory:any=null;

  term:string='';

  ngOnInit(): void {
    // this.GetAllCategories();
    this.categories=this._CategoryService.categories.getValue();

  }

  CategoryForm:FormGroup=new FormGroup({
    'Name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
  })

  CategoryUpdateForm:FormGroup=new FormGroup({
  'Name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z]{2,30}$/)]),
  })



  GetCurrentId(id:number){
    this.CurrnetID = id;
    this.currentCategory = this.categories.find(x=>x.id == id);
    this.CategoryUpdateForm.get('Name')?.setValue(this.currentCategory?.name);
  }

  // GetAllCategories(){
  //   this._CategoryService.GetAllCategories().subscribe({
  //     next:(data)=>{
  //       this.categories= data;
  //     }
  //   })
  // }


  AddCategory(data:FormGroup){
    if(this.CategoryForm.invalid) return;
    let object={
      'Name': data.value.Name,
    }
    this._CategoryService.AddCategory(object).subscribe({
      next:()=>{
        // this.GetAllCategories();
        this.CategoryForm.reset();
        this.closeModal?.nativeElement.click();
        // document.getElementById("closeModalButton").click();
      }
    })
  }

  UpdateCategory(data:FormGroup){
    if(this.CategoryUpdateForm.invalid) return;
    let obj={
      'id':this.CurrnetID,
      'name': data.value.Name,
    }
    this._CategoryService.UpdateCategory(this.CurrnetID,obj).subscribe({
      next:()=>{
        // this.GetAllCategories();
      }
    })
  }

  DeleteCategory(){
    this._CategoryService.DeleteCategory(this.CurrnetID).subscribe({
      next:(data)=>{
        // this.GetAllCategories();
      }
    })
  }
}
