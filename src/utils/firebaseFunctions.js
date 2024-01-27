import {collection, doc, getDocs, orderBy, query, setDoc, deleteDoc, onSnapshot, updateDoc} from "firebase/firestore";
import { firestore } from "../firebase.config";


// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "bbtItems", `${data.id}`), data, {
    merge: true,
  });
};

// getall bbt items
export const getAllBbtItems = async () => {
  const items = await getDocs(query(collection(firestore, "bbtItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// save order id and create items collection
export const saveOrder = (orderId) => {
  const ordersCollectionRef = collection(firestore, "orders");
  const orderDocRef = doc(ordersCollectionRef, orderId);
  const itemsCollectionRef = collection(orderDocRef, "items");
  return itemsCollectionRef;
};
// store product details in items collection
export const addOrderProducts = async(data, itemsCollection) => {
  const newItemRef = doc(itemsCollection);
  await setDoc(newItemRef, data);
};


export const deleteItem = async (id) => {
    await deleteDoc(doc(firestore, "bbtItems", id))
};

export const editItem = async (id, item) => {
    await updateDoc(doc(firestore, "bbtItems", id), item)
};

// Saving new Promo
export const savePromo = async (data) => {
  await setDoc(doc(firestore, "promos", `${data.id}`), data, {
    merge: true,
  });
};

// getall promos
export const getAllPromos = async () => {
  const items = await getDocs(query(collection(firestore, "promos"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// delete promo
export const deletePromo = async (id) => {
    await deleteDoc(doc(firestore, "promos", id))
};


