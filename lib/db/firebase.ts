// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD75yyO_mF4T-a6qb9YgLneq5R9vibcUlA',
	authDomain: 'twinkie-9fda8.firebaseapp.com',
	projectId: 'twinkie-9fda8',
	storageBucket: 'twinkie-9fda8.appspot.com',
	messagingSenderId: '208645283007',
	appId: '1:208645283007:web:afc74e42a1a85510efba0a',
	measurementId: 'G-MY9CPRNZ89',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export async function getUsers(db: any) {
	const dbCollection = collection(db, 'incidents');
	const userSnap = await getDocs(dbCollection);
	const userList = userSnap.docs.map((doc) => doc.data);
	return userList;
}
