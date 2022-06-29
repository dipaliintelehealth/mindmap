import { Component, OnInit } from '@angular/core';
import { customizeUtil, MindMapMain } from 'angular-mindmap';

const HIERARCHY_RULES = {
  ROOT: {
    name: 'root',
    backgroundColor: '#7EC6E1',
    getChildren: () => [
      HIERARCHY_RULES.SALES_MANAGER,
      HIERARCHY_RULES.SHOW_ROOM,
      HIERARCHY_RULES.SALES_TEAM,
    ],
  },
  SALES_MANAGER: {
    name: 'Manager',
    color: '#fff',
    backgroundColor: '#616161',
    getChildren: () => [HIERARCHY_RULES.SHOW_ROOM, HIERARCHY_RULES.SALES_TEAM],
  },
  SHOW_ROOM: {
    name: 'Room',
    color: '#fff',
    backgroundColor: '#989898',
    getChildren: () => [HIERARCHY_RULES.SALES_TEAM],
  },
  SALES_TEAM: {
    name: 'Team',
    color: '#fff',
    backgroundColor: '#C6C6C6',
    getChildren: () => [],
  },
};

const option = {
  container: 'jsmind_container',
  theme: 'normal',
  editable: true,
  depth: 15,
  hierarchyRule: HIERARCHY_RULES,
};

const mind = {
  format: 'nodeTree',
  data: {
    id: 43,
    topic: 'Manager and room',
    selectedType: false,
    backgroundColor: '#7EC6E1',
    children: [
      {
        id: 80,
        color: '#fff',
        topic: 'show room',
        direction: 'right',
        selectedType: false,
        backgroundColor: '#616161',
        children: [],
      },
      {
        id: 44,
        color: '#fff',
        topic: 'Manager',
        direction: 'right',
        selectedType: false,
        backgroundColor: '#616161',
        children: [
          {
            id: 46,
            color: '#fff',
            topic: 'Room 1',
            direction: 'right',
            selectedType: false,
            backgroundColor: '#989898',
            children: [
              {
                id: 49,
                color: '#fff',
                topic: 'TeamC',
                direction: 'right',
                selectedType: false,
                backgroundColor: '#C6C6C6',
                children: [],
              },
              {
                id: 51,
                color: '#fff',
                topic: 'AMG 1',
                direction: 'right',
                selectedType: false,
                backgroundColor: '#C6C6C6',
                children: [],
              },
              {
                id: 47,
                color: '#fff',
                topic: 'TeamA',
                direction: 'right',
                selectedType: false,
                backgroundColor: '#C6C6C6',
                children: [],
              },
              {
                id: 48,
                color: '#fff',
                topic: 'TeamB',
                direction: 'right',
                selectedType: false,
                backgroundColor: '#C6C6C6',
                children: [],
              },
              {
                id: 50,
                color: '#fff',
                topic: 'TeamD',
                direction: 'right',
                selectedType: false,
                backgroundColor: '#C6C6C6',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 45,
        color: '#fff',
        topic: 'Smart app',
        direction: 'right',
        selectedType: false,
        backgroundColor: '#616161',
        children: [],
      },
    ],
  },
};

@Component({
  selector: 'app-jsmind',
  templateUrl: './jsmind.component.html',
  styleUrls: ['./jsmind.component.css'],
})
export class JsmindComponent implements OnInit {
  mindMap: any;
  title = 'example-angular10';
  constructor() {}

  ngOnInit() {
    this.mindMap = MindMapMain.show(option, mind);
  }
  removeNode() {
    const selectedNode = this.mindMap.getSelectedNode();
    const selectedId = selectedNode && selectedNode.id;

    if (!selectedId) {
      return;
    }
    this.mindMap.removeNode(selectedId);
  }

  addNode() {
    const selectedNode = this.mindMap.getSelectedNode();
    if (!selectedNode) {
      return;
    }

    const nodeId = customizeUtil.uuid.newid();
    this.mindMap.addNode(selectedNode, nodeId);
  }

  getMindMapData() {
    const data = this.mindMap.getData().data;
    console.log('data: ', data);
  }
}
