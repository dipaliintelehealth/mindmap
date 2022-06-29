import { Component, OnInit } from '@angular/core';
import { IData } from '../Interfaces/pie-data.interface';
import { PieDataService } from '../services/pie-data.service';

@Component({
  selector: 'app-pie-custom-data',
  templateUrl: './pie-custom-data.component.html',
  styleUrls: ['./pie-custom-data.component.css'],
})
export class PieCustomDataComponent implements OnInit {
  data!: IData[];
  newLabel!: string;
  newValue!: number;
  constructor(private dataService: PieDataService) {}

  ngOnInit(): void {
    this.dataService.$data.subscribe((data) => {
      this.data = data;
    });
  }
  addData(): void {
    let newData = {
      label: this.newLabel,
      value: this.newValue,
    } as IData;
    this.dataService.addData(newData);
  }
}
