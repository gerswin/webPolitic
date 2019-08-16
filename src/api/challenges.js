import {db} from '../firebaseData';

export default () => {
  db.collection("retos")
    .get()
    .then(querySnapshot => {
      let retos = [];
      querySnapshot.forEach(doc => {
        retos.push({ id: doc.id, ...doc.data() });
      });

    });
}