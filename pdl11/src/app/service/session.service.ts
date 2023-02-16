import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setIntoSession(value: string)

  {

    sessionStorage.setItem('key',value)

  }

  checkSession (){

    if(sessionStorage.getItem('key')!=null){

      return true;

    }

    return false;

  }
}
