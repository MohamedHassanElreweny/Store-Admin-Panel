import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string='https://localhost:7296/api/Product';

  GetAllProducts():Observable<any>{
    return this._HttpClient.get(this.baseUrl);
  }

  AddProduct(data:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl,data);
  }

  DeleteProduct(id:number):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+'/'+id);
  }

  UpdateProduct( id:number, obj:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl+'/'+id,obj);
  }

  GetProductById(id:number):Observable<any>{
    return this._HttpClient.get(this.baseUrl+'/'+id);
  }

  uploadImage(file:File):Observable<any>{
    var formdata = new FormData();
    formdata.append('image',file);
    return this._HttpClient.post("https://localhost:7296/api/images",formdata);
  }

  addProductImages(data:any):Observable<any>{
    return this._HttpClient.post("https://localhost:7296/api/productImages",data)
  }

  DeleteImage(id:number):Observable<any>{
    return this._HttpClient.delete("https://localhost:7296/api/productImages"+'/'+id)
  }

  getImages(id:number):Observable<any>{
    return this._HttpClient.get("https://localhost:7296/api/productImages"+'/'+id)
  }

}
