import { Categorie } from "./categorie";

export class Produit {
   id:number | undefined;
   code:string | undefined;
   designation: string | undefined;
   categorie:Categorie | undefined;
   prix:number | undefined
}
