import { firestore as db } from "./init";

module.exports = {
  Categories: db.collection('categories')
}