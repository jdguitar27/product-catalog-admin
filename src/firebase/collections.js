import { firestore as db } from "./init";

export const Categories = db.collection('categories');

export const Products = db.collection('products');