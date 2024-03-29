import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-gestion-produits';
  actions:Array<any> =
  [
    { titre:"Accueil", route:"/accueil", icon:"bi bi-house"},
    { titre:"Liste des produits", route:"/produits", icon:"bi bi-list"},
    { titre:"Ajouter Produit", route:"/ajouterProduit", icon: "bi bi-plus"},
  ]
  actionCourante:any;
  setActionCourante(a :any)
  {
    this.actionCourante=a;
  }
}
