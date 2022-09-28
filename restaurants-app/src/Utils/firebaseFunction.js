import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Items
export const saveItem = async (data) => {
  // fire store which helps to set a new value . If its already their it will update it. if its not their it will create it
  // firestore is object which is coming from firebase.config
  await setDoc(
    //id - '${Date.now()}'
    //document - data
    //merge - if we need to add new data in future we can use it
    doc(firestore, "foodItems",`${Date.now()}`),
    data,
    { merge: true }
  );
};

//getall food items
export const getAllFoodItems = async () =>{
  // get docs is used to recived all the document / details from firestore database
    const items = await getDocs( 
      query(collection(firestore, "foodItems"), orderBy("id","desc"))
    );

    return items.docs.map((doc) => doc.data());
}