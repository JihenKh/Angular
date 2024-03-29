import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/protuit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrl: './ajout-produit.component.css'
})
export class AjoutProduitComponent implements OnInit{


  produits: Produit[] = [];
  categories: Categorie[]=[];
  nouveauProduit: Produit = new Produit();
  constructor(private produitsService:ProduitsService){

  }
  ngOnInit(): void {
    this.consulterProduits();
    this.consulterCategories()
  }
  consulterProduits() {
    console.log("Récupérer la liste des produits");
    this.produitsService.getProduits() .subscribe( {
       next: (data: Produit[])=> {
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

  // consulterProduits() {
  //   this.http.get<Produit[]>("http://localhost:9999/produits").subscribe({
  //     next: data => {
  //       console.log("Succès GET");
  //       this.produits = data;
  //     },
  //     error: err => {
  //       console.log("Erreur GET");
  //     }
  //   });
  // }

  // ajouterProduit(nouveau: Produit) {
  //   this.http.post<Produit>("http://localhost:9999/produits", nouveau)
  //     .subscribe(addedProduit => {
  //       console.log("Succès POST");
  //       this.produits.push(addedProduit);
  //       console.log("Ajout d'un nouveau produit:" + addedProduit.designation);
  //     }, error => {
  //       console.log("Erreur POST");
  //     });
  // }


  ajouterProduit(nouveau:Produit){
    this.nouveauProduit.id = this.produits.length + 1;
    this.produitsService.addProduit(nouveau).subscribe({
      next: addedProduct => {
        console.log("Succès POST");
        this.produits.push(nouveau);
        console.log("Ajout d'un nouveau produit:"+nouveau.designation);
      },
      error: err => {
        console.log("Erreur POST");
      }
    });
  }
  validerFormulaire(form: NgForm) {

            console.log('nouveau');
            this.ajouterProduit(form.value);
            form.reset();

}

  // validerFormulaire(form: NgForm) {
  //   console.log(form.value);
  //   if (form.value.id != undefined) {
  //     console.log("id non vide...");
  //     let index = this.produits.findIndex(p => p.id === form.value.id);

  //       console.log("Ajout de l'objet...");
  //       this.http.post<Produit>("http://localhost:9999/produits", form.value)
  //         .subscribe({
  //           next: newProduit => {
  //             console.log("Succès POST");
  //             this.produits.push(newProduit);
  //             console.log("Ajout d'un nouveau produit:" + newProduit.designation);
  //           },
  //           error: err => {
  //             console.log("Erreur POST");
  //           }
  //         });

  //   } else {
  //     console.log("id vide...");
  //   }
  // }


  // mettreAJourProduit(nouveau: Produit, ancien: Produit) {
  //   this.http.put<Produit>("http://localhost:9999/produits/" + ancien.id, nouveau).subscribe({
  //     next: updatedProduit => {
  //       console.log("Succès PUT");
  //       // Mettre à jour le produit dans la liste des produits
  //       const index = this.produits.findIndex(p => p.id === ancien.id);
  //       if (index !== -1) {
  //         this.produits[index] = updatedProduit;
  //       }
  //     },
  //     error: err => {
  //       console.log("Erreur PUT");
  //     }
  //   });
  // }
  // validerFormulaire(form: NgForm)
  // {
  //     let nouveau=form.value;
  //     this.http.post<Produit>("http://localhost:9999/produits", nouveau)
  //     .subscribe(addedProduit => {
  //       console.log("Succès POST");
  //       this.produits.push(addedProduit);
  //       console.log("Ajout d'un nouveau produit:" + addedProduit.designation);
  //     }, error => {
  //       console.log("Erreur POST");
  //     });
  //      form.reset();
  // }




  // ngOnInit(): void {
  //   console.log("Initialisation du composant: Récupérer la liste des produits");
  //   this.http.get<Array<Produit>> ("http://localhost:9999/produits") .subscribe( {
  //      next: data=> {
  //       console.log("Succès GET");
  //       this.produits=data;
  //     }, error: err=> {
  //        console.log("Erreur GET");
  //       }
  //     }
  //     )
  // }
  // produits: Array<Produit> = [
  //   {id:1,code:'x12',designation:"Panier plastique",prix:20},
  //   {id:2,code:'y4',designation:"table en bois",prix:100},
  //   {id:3,code:'y10',designation:"salon en cuir",prix:3000}
  // ];
  // // supprimerProduit(p: Produit) {
  // //   console.log("response");

  // //     let reponse:boolean =confirm("Voulez vous supprimer le produit :"+p.designation+" ?");
  // //     if (reponse==true) {
  // //       console.log("Suppression confirmée..." );
  // //       let index: number = this.produits.indexOf(p);
  // //       console.log("indice du produit à supprimer: "+index);
  // //       if (index !== -1) {
  // //         // supprimer le produit référencé
  // //         this.produits.splice(index, 1);
  // //       }
  // //     } else {
  // //       console.log("Suppression annulée..." );
  // //     }
  // // }

  // validerFormulaire(form: NgForm) {
  //   console.log(form.value);

  //   if (form.value.id !== undefined && !this.produits.some(produit => produit.id === form.value.id)) {
  //     console.log("Ajout de l'objet...");

  //     this.produits.push(form.value);
  //   } else {
  //     const index = this.produits.findIndex(produit => produit.id === form.value.id);
  //     if (index !== -1) {
  //       console.log("Mise à jour de l'objet...");
  //       this.produits[index] = form.value;
  //     } else {
  //       console.log("ID vide ou déjà existant...");
  //     }
  //   }
  // }
  // validerFormulaire(form: NgForm) {
  //   console.log(form.value);
  //   if (form.value.id != undefined) {
  //     console.log("id non vide...");
  //     let nouveau:boolean=true;
  //     let index=0;
  //     do {
  //       let p=this.produits[index];
  //       console.log( p.code + ' : ' + p.designation + ': ' + p.prix);
  //       if (p.id==form.value.id) {
  //         nouveau=false;
  //         console.log('ancien');
  //         let reponse:boolean = confirm("Produit existant. Confirmez-vous la mise à jour de :"+p.designation+" ?");
  //         if (reponse==true) {
  //           this.produitsService.updateProduit(form.value.id, form.value).subscribe({
  //             next: updatedProduit=> {
  //               console.log("Succès PUT");
  //               p.code=form.value.code;
  //               p.designation=form.value.designation;
  //               p.prix=form.value.prix;
  //               console.log('Mise à jour du produit:' +p.designation);
  //             },
  //             error: err=> {
  //               console.log("Erreur PUT");
  //             }
  //           });
  //         } else {
  //           console.log("Mise à jour annulée");
  //         }
  //         return;
  //       } else {
  //         index++;
  //       }
  //     } while(nouveau && index<this.produits.length);

  //   } else {
  //     console.log("id vide...");
  //   }
  // }

  // validerFormulaire(form: NgForm) {
  //   console.log(form.value);
  //   if (form.value.id != undefined) {
  //     console.log("id non vide...");
  //     let index = this.produits.findIndex(p => p.id === form.value.id);

  //       console.log("Ajout de l'objet...");
  //       this.http.post<Produit>("http://localhost:9999/produits", form.value)
  //         .subscribe({
  //           next: newProduit => {
  //             console.log("Succès POST");
  //             this.produits.push(newProduit);
  //             console.log("Ajout d'un nouveau produit:" + newProduit.designation);
  //           },
  //           error: err => {
  //             console.log("Erreur POST");
  //           }
  //         });

  //   } else {
  //     console.log("id vide...");
  //   }
  // }

  // supprimerProduit(p:Produit) {
  //   let reponse = confirm("Êtes-vous sûr de vouloir supprimer ce produit ?");
  //   if (reponse) {
  //     this.http.delete("http://localhost:9999/produits/" + p.id)
  //       .subscribe({
  //         next: () => {
  //           console.log("Succès DELETE");
  //           let index: number = this.produits.indexOf(p);
  //           if (index !== -1) {
  //             this.produits.splice(index, 1);
  //             console.log("Produit supprimé avec succès.");
  //           }
  //         },
  //         error: err => {
  //           console.log("Erreur DELETE");
  //         }
  //       });
  //   } else {
  //     console.log("Suppression annulée");
  //   }
  // }
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
    this.nouveauProduit = { ...produit };
  }

}
