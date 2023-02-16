import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserCredential } from '@angular/fire/auth';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }
 signUp( name:string,email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({user})=>updateProfile(user,{displayName:name})));
  }
  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  logout() {
    return from(this.auth.signOut());
  }
}
