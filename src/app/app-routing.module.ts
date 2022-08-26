import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard',canActivate:[AuthGuard] , component: DashboardComponent },
  {path:'brands',canActivate:[AuthGuard] ,component:BrandsComponent},
  {path:'categories',canActivate:[AuthGuard] ,component:CategoriesComponent},
  {path:'products',canActivate:[AuthGuard] ,component:ProductsComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',canActivate:[AuthGuard] ,component:ProfileComponent},
  {path:'productDetails/:id',canActivate:[AuthGuard] ,component:ProductDetailsComponent},
  {path:'updateProduct',canActivate:[AuthGuard] ,component:UpdateProductComponent},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
