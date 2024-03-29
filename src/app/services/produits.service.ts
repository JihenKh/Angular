import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../model/protuit';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  urlHote="http://localhost:3333/produits/";
  url="http://localhost:3333/categories/";

   constructor(private http :HttpClient) { }
    getProduits() :Observable<Array<Produit>> {
      return this.http.get<Array<Produit>> (this.urlHote);
    }
    getCategories() :Observable<Array<Categorie>> {
      return this.http.get<Array<Categorie>> (this.url);
    }

    deleteProduit(idP: number|undefined) {
      return this.http.get (this.urlHote+"delete/"+idP);
      }
    addProduit(nouveau: Produit) {
       return this.http.post<Array<Produit>> (this.urlHote,nouveau);
      }
    updateProduit(idP: number | undefined, nouveau: Produit) {
      return this.http.put(this.urlHote,nouveau);
    }
}
