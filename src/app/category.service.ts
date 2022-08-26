import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories = new BehaviorSubject<Array<Category>>([]);

  constructor(private _HttpClient:HttpClient) {
    this.SetCategories();
  }

  baseUrl:string='https://localhost:7296/api/Categories';



  GetAllCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl);
  }

  AddCategory(data:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl,data);
  }

  DeleteCategory(id:number):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+'/'+id);
  }

  UpdateCategory( id:number, obj:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl+'/'+id,obj);
  }

  SetCategories(){
    this.GetAllCategories().subscribe({
      next:(data)=>{
        this.categories.next(data);
      }
    })
  }

}
