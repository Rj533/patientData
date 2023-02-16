import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Patient } from './patient.interface';



@Injectable({
    providedIn: 'root',
  })
  export class PatientsService {
    private patientSource = new BehaviorSubject<any | null>(null);
    patients$ = this.patientSource.asObservable();
  
    constructor(private firestore: Firestore) {}
  
    addPatient(patient: Patient) {
      const patientsRef = collection(this.firestore, 'patients');
      return addDoc(patientsRef, patient);
    }
  
    getPatients(filter = '') {
      const patientsRef = collection(this.firestore, 'patients');
      let q = query(patientsRef);
      if (filter) {
        q = query(patientsRef, where('name', '==', filter));
      }
      return collectionData(q) as unknown as Observable<Patient[]>;
    }
  
    async updatePatient(patient: Patient) {
      const patientsRef = collection(this.firestore, 'patients');
      let q = query(patientsRef, where('id', '==', patient.id));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (document) => {
        const docRef = doc(this.firestore, 'patients', document.id);
        await updateDoc(docRef, { ...patient });
      });
    }
  
    async deletePatient(id: string) {
      const patientsRef = collection(this.firestore, 'patients');
      let q = query(patientsRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (document) => {
        const docRef = doc(this.firestore, 'patients', document.id);
        deleteDoc(docRef);
      });
    }
  }
  