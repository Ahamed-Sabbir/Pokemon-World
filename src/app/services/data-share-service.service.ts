import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {

  private dataBehaviousSubject = new BehaviorSubject<any>(null);
  data = this.dataBehaviousSubject.asObservable();

  constructor() { 
    const storageData = localStorage.getItem('commonData');
    if(storageData){
      this.dataBehaviousSubject.next(JSON.parse(storageData));
    }
  }

  sendData(data: any){
    this.dataBehaviousSubject.next(data);
    localStorage.setItem('commonData', JSON.stringify(data));
  }

}
