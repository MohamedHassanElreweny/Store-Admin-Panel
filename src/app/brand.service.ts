import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string='https://localhost:7296/api/Brands';

  GetAllBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl);
  }

  AddBrand(data:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl,data);
  }

  DeleteBrand(id:number):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+'/'+id);
  }

  UpdateBrand( id:number, obj:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl+'/'+id,obj);
  }


}
