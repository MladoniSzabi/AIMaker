import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService, FileTree } from '../backend.service';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

type FlattenedFileTree = {
  expandable: boolean,
  name: string,
  level: number,
  parents: string
}

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  collectParents(lookIn: FileTree[], node: FileTree, level: number): string[] {
    for (let n of lookIn) {
      if (n == node) {
        return [node.name]
      } else if (n.children) {
        let res = this.collectParents(n.children, node, level - 1)
        if (res.length != 0) {
          return [n.name, ...res]
        }
      }
    }
    return []
  }

  private transformer = (node: FileTree, level: number) => ({
    expandable: node.children != null,
    name: node.name,
    level: level,
    parents: "/" + this.project + "/" + this.collectParents(this.dataSource.data, node, level).join("/"),
  })

  treeControl = new FlatTreeControl<FlattenedFileTree>(
    node => node.level,
    node => node.expandable,
  )

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  )

  dataSource: MatTreeFlatDataSource<FileTree, FlattenedFileTree> = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)
  project: string = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private backendService: BackendService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get("projectName")) {
        let projectName = params.get("projectName") || ""
        this.project = projectName
        this.backendService.getFileList(projectName).subscribe(fileList => {
          this.dataSource.data = fileList
        })
      }
    })
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: FlattenedFileTree) => node.expandable;

}
