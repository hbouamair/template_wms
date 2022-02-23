import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from "../database.service";
import { ToastController } from '@ionic/angular';
import { Product } from '../classes/product';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  material: string = "";
  description: string = "";
  cagette: string = "";
 
  constructor( private crud: DatabaseService ) {
    this.crud.databaseConn(); 
   }


  

  ngOnInit() { }

  ionViewDidEnter() {  
    this.crud.getAllProducts()
  }
   
  createProduct(){
    this.crud.addProduct(this.material, this.description, this.cagette);
  }
   
  remove(product) {
    this.crud.deleteProduct(product);
  }

}
