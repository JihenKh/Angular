import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit{
  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];

  // produits: Array<Produit> = [
  //   {id:1,code:'x12',designation:"Panier plastique",prix:20},
  //   {id:2,code:'y4',designation:"table en bois",prix:100},
  //   {id:3,code:'y10',designation:"salon en cuir",prix:3000}
  // ];
  editionEnCours: boolean = false;


constructor(private http:HttpClient,private produitsService:ProduitsService){

  }
  ngOnInit(): void {
   this.consulterProduits();
   this.consulterCategories();
      }
      // consulterProduits(){
      //   this.http.get<Array<Produit>> ("http://localhost:9999/produits") .subscribe( {
      //     next: data=> {
      //       console.log("Succès GET");
      //        this.produits=data;
      //       }, error: err=> {
      //         console.log("Erreur GET"); }
      //       })
      // }
  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits() .subscribe( {
       next: data=> {
        console.log("Succès GET");
        this.produits=data;
       },
        error: err=> { console.log("Erreur GET");
      }
    }
    )
  }

  consulterCategories() {
    console.log("Récupérer la liste des categorie");
    this.produitsService.getCategories() .subscribe( {
       next: (data: Categorie[])=> {
        console.log("Succès GET");
        this.categories=data;
       },
        error: err=> { console.log("Erreur GET");
      }
    }
    )
  }

  produitCourant = new Produit();
  validerFormulaire(form: NgForm) {
    console.log(form.value);
      console.log("id non vide...");
      let nouveau:boolean=true;
      let index=0;
      do {
        let p=this.produits[index];
        console.log( p.code + ' : ' + p.designation + ': ' + p.prix);
        if (p.id==form.value.id) {
          nouveau=false;
          console.log('ancien');
          let reponse:boolean = confirm("Produit existant. Confirmez-vous la mise à jour de :"+p.designation+" ?");
          if (reponse==true) {
            this.mettreAJourProduit(form.value,p);
            form.resetForm();
            this.editionEnCours = true;




          } else {
            console.log("Mise à jour annulée");
          }
          return;
        } else {
          index++;
        }
      } while( index<this.produits.length);


}


mettreAJourProduit(nouveau: Produit, ancien: Produit) {
  this.produitsService.updateProduit(ancien.id, nouveau).subscribe({
    next: updatedProduit=> {
      console.log("Succès PUT");
      ancien.code=nouveau.code;
      ancien.designation=nouveau.designation;
      ancien.prix=nouveau.prix;
      console.log('Mise à jour du produit:' +ancien.designation);

    },
    error: err=> {
      console.log("Erreur PUT");
    }
  });
}
supprimerProduit(produit: Produit) {
  const confirmerSuppression = confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');

  if (confirmerSuppression) {
    this.produitsService.deleteProduit(produit.id).subscribe({
      next: () => {
        console.log(`Produit avec l'ID ${produit.id} supprimé avec succès.`);
        this.produits = this.produits.filter(p => p.id !== produit.id);
      },
      error: (err) => {
        console.error(`Erreur lors de la suppression du produit avec l'ID ${produit.id}:`, err);
      }
    });
  } else {
    console.log('Suppression annulée par l\'utilisateur.');
  }
}



  effacerFormulaire(form: NgForm) {
    form.resetForm();
  }
  editerProduit(produit: Produit) {
    this.produitCourant = { ...produit };
    this.editionEnCours = true;

  }



}



