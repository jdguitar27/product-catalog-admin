import { firestore as db } from "./init";
import firebase from "firebase";

export default db;

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const Categories = db.collection('categories');

export const Products = db.collection('products');