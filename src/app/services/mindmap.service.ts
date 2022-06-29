import { Injectable } from '@angular/core';
import { IMindMapData } from '../Interfaces/mindmap-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MindmapService {
  private mockData: IMindMapData = {
    name: 'root',
    children: [
      {
        name: 'child #1',
      },
      {
        name: 'child #2',
        children: [
          { name: 'grandchild #1' },
          { name: 'grandchild #2' },
          { name: 'grandchild #3' },
        ],
      },
    ],
  };

  private dataSubject = new BehaviorSubject<IMindMapData>(this.mockData);
  $data = this.dataSubject.asObservable();
  addData(parentNode: IMindMapData, childNode: IMindMapData) {
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = new Array<IMindMapData>();
      }
      parentNode.children.push(childNode);
    }
  }
}
