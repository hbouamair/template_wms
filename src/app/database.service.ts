import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject;
  readonly db_name: string = "wmsa.db";
  readonly db_table: string = "produits";
  Products: Array <any> ;


  constructor( private platform: Platform,
    private sqlite: SQLite ) {
      this.databaseConn();


   }


   databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({
          name: this.db_name,
          location: 'default'
        }).then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                product_id INTEGER PRIMARY KEY, 
                material varchar(255),
                description varchar(255),
                cagette varchar(255),

              )`, [])
            .then((res) => {
              // alert(JSON.stringify(res));
            })
            .catch((error) => alert(JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });   
}

// Crud
public addProduct(n, e , c) {
  // validation
  if (!n.length || !e.length  || !c.length ) { 
    alert('');
    return;
  }
  this.dbInstance.executeSql(`
  INSERT INTO ${this.db_table} (material, description , cagette) VALUES ('${n}', '${e}' , '${c}')`, [])
    .then(() => {
      alert("Success");
      this.getAllProducts();
    }, (e) => {
      alert(JSON.stringify(e.err));
    });
}

getAllProducts() {
  return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
    this.Products = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        this.Products.push(res.rows.item(i));
      }
      return this.Products;
    }
  },(e) => {
    alert(JSON.stringify(e));
  });
}

// Get user
getProduct(id): Promise<any> {
  return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE product_id = ?`, [id])
  .then((res) => { 
    return {
      product_id: res.rows.item(0).product_id,
      material: res.rows.item(0).material,  
      description : res.rows.item(0).description,
      cagette : res.rows.item(0).cagette,

    }
  });
}

// Update
updateUser(id, material, description , cagette) {
  let data = [material, description , cagette];
  return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET material = ?, description = ? , cagette = ? WHERE product_id = ${id}`, data)
}  

// Delete
deleteProduct(product) {
  this.dbInstance.executeSql(`
  DELETE FROM ${this.db_table} WHERE product_id = ${product}`, [])
    .then(() => {
      alert("produit deleted!");
      this.getAllProducts();
    })
    .catch(e => {
      alert(JSON.stringify(e))
    });
}


}
 