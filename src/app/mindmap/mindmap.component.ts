import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IMindMapData } from '../Interfaces/mindmap-interface';
import { MindmapService } from '../services/mindmap.service';
import * as D3 from 'd3';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mindmap',
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.css'],
})
export class MindmapComponent implements AfterViewInit {
  @ViewChild('containerMindmap') element!: ElementRef;
  private host!: D3.Selection<HTMLElement, {}, d3.BaseType, any>;
  private svg!: D3.Selection<SVGGElement, {}, d3.BaseType, any>;
  private width!: number;
  private height!: number;
  private margin: any;
  private radius!: number;
  private htmlElement!: HTMLElement;
  private mmData!: IMindMapData;
  private treemap!: any;
  private root: any;
  private currentSelected: any;
  isShown: boolean = false;
  nodeName!: string;
  jsonData!: any;
  sanitizer!: any;
  downloadJsonHref!: any;
  constructor(private dataService: MindmapService) {}

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.dataService.$data.subscribe((data) => {
      this.mmData = data;
      console.log('******dra****', this.mmData);
      this.setup();
      this.buildSVG();
      this.buildMM();
    });
  }
  private setup(): void {
    this.margin = { top: 10, right: 10, bottom: 10, left: 40 };
    this.width = 1200 - this.margin.left - this.margin.right;
    this.height = 1200 - this.margin.top - this.margin.bottom;
  }
  private buildSVG(): void {
    this.host.html('');
    this.svg = this.host
      .append('svg')
      .attr('viewBox', [
        -this.margin.left,
        -this.margin.top,
        this.width,
        this.height,
      ])
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .style('font', '10px sans-serif')
      .style('user-select', 'none')
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }
  private buildMM(): void {
    this.treemap = D3.tree<SVGGElement>().size([this.height, this.width]);
    this.root = D3.hierarchy(this.mmData, function (d) {
      return d.children;
    }); //Generate the pie
    console.log('root ', this.root);
    this.root.x0 = this.height / 2;
    this.root.y0 = 0;
    this.update(this.root);
  }
  private update(source: any) {
    var treeData = this.treemap(this.root);
    let i = 0;
    let duration = 750;
    // nodes
    var nodes = treeData.descendants();
    nodes.forEach(function (d: any) {
      d.y = d.depth * 180;
    });
    var node = this.svg
      .selectAll<SVGGElement, unknown>('g.node')
      .data(nodes, function (d: any) {
        return d.id || (d.id = ++i);
      });
    var nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + source.y0 + ', ' + source.x0 + ')';
      })
      .on('click', click);

    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 0)
      .style('fill', function (d: any) {
        return d._children ? 'red' : '#fff';
      });

    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', function (d: any) {
        return d.options || d._children ? -13 : 13;
      })
      .attr('text-anchor', function (d: any) {
        return d.options || d._children ? 'end' : 'start';
      })
      .text(function (d: any) {
        return d.data ? d.data.text : d.name;
      });

    var nodeUpdate = nodeEnter.merge(node);

    nodeUpdate
      .transition()
      .duration(duration)
      .attr('transform', function (d: any) {
        return 'translate(' + d.y + ', ' + d.x + ')';
      });

    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .style('fill', function (d: any) {
        return d._children ? 'red' : '#fff';
      })
      .attr('cursor', 'pointer');

    let nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    nodeExit.select('circle').attr('r', 0);
    nodeExit.select('text').style('fill-opacity', 0);

    // links
    function diagonal(s: any, d: any) {
      let path = `M ${s.y} ${s.x}
         C ${(s.y + d.y) / 2} ${s.x}
           ${(s.y + d.y) / 2} ${d.x}
           ${d.y} ${d.x}`;
      return path;
    }
    var links = treeData.descendants().slice(1);
    var link = this.svg
      .selectAll<SVGPathElement, unknown>('path.link')
      .data(links, function (d: any) {
        return d.id;
      });
    var linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function (d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });
    var linkUpdate = linkEnter.merge(link);
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', function (d: any) {
        return diagonal(d, d.parent);
      });

    var linkExit = link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      })
      .remove();

    nodes.forEach(function (d: any) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    let self = this;

    function click(event: any, d: any) {
      self.currentSelected = d;
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      self.update(d);
    }
  }
  addNode(): void {
    let newData = {
      topic: 'abcd',
    } as IMindMapData;

    let newNode: any = D3.hierarchy(newData, function (d) {
      return d.children;
    });
    newNode.parent = this.currentSelected;
    newNode.depth = this.currentSelected.depth + 1;
    if (this.currentSelected && !this.currentSelected.data.children) {
      this.currentSelected.data.children = [];
      this.currentSelected.children = [];
    }
    this.currentSelected.children.push(newNode);
    this.currentSelected.data.children.push(newNode.data);
    this.update(this.currentSelected);
  }
  editNode(): void {
    this.isShown = true;
    this.nodeName = this.currentSelected.data.name;
    console.log(this.nodeName);
  }
  deleteNode(): void {
    let parent = this.currentSelected.parent;
    if (parent && parent.children && parent.children.length > 0) {
      parent.children = parent.children.filter(
        (value: any, index: number, array: Array<any>) =>
          value.data.name !== this.currentSelected.data.name
      );
      this.update(parent);
    }
  }

  onEditSave(): void {
    this.isShown = false;
    this.currentSelected.data.name = this.nodeName;
    this.currentSelected.name = this.nodeName;
    this.update(this.currentSelected);
  }

  hierarchyToJson(root: any): any {
    if (root) {
      let data = {
        name: root.data.name,
        children: Array<any>(),
      };
      if (root.children) {
        root.children.forEach((child: any) => {
          data.children.push(this.hierarchyToJson(child));
        });
      }
      return data;
    }
    return null;
  }
  getJsonData(): void {
    let exportData = this.hierarchyToJson(this.root);
    console.log('hierarchy', JSON.stringify(exportData));
    return saveAs(
      new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }),
      'sample.json'
    );
  }
}
