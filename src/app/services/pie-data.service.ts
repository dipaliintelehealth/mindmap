import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IData } from '../Interfaces/pie-data.interface';

@Injectable({
  providedIn: 'root',
})
export class PieDataService {
  private mockData: IData[] = [
    {
      label: 'data1',
      value: 1,
    },
    {
      label: 'data2',
      value: 2,
    },
    {
      label: 'data3',
      value: 3,
    },
    {
      label: 'data4',
      value: 4,
    },
  ];

  private dataSubject = new BehaviorSubject<IData[]>(this.mockData);
  $data = this.dataSubject.asObservable();
  addData(newData: IData) {
    this.mockData.push(newData);
    this.dataSubject.next(this.mockData);
  }
}
