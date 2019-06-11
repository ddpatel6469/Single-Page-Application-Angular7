import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductsService]
})
export class ProductsComponent implements OnInit,OnDestroy {

  pageTitle : String = "Products";

  filterBy : String;

  showHideImage : boolean = true;

  products : any = [];

  productSubscription : any;

  constructor(private _productService : ProductsService) { 
    
  }

  ngOnInit() {
    this.productSubscription = this._productService.getProducts().subscribe((data) => {
       this.products = data;
    });
  }

  ngOnDestroy(){
    this.productSubscription.unsubscribe();
  }

  toggleImage() : void { 
    this.showHideImage = !this.showHideImage;
  }

}
