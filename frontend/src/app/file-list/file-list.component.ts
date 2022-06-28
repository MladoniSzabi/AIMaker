import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService, FileTree } from '../backend.service';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

type FlattenedFileTree = {
  expandable: boolean,
  name: string,
  level: number
}

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  private transformer = (node: FileTree, level: number) => ({
    expandable: node.children != null,
    name: node.name,
    level: level,
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

  dataSource : MatTreeFlatDataSource<FileTree, FlattenedFileTree> = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener)

  constructor(
    private activatedRoute: ActivatedRoute,
    private backendService: BackendService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get("projectName")) {
        let projectName = params.get("projectName") || ""
        this.backendService.getFileList(projectName).subscribe(fileList => {
          console.log(fileList)
          this.dataSource.data = fileList
        })
      }
    })
  }

  ngOnInit(): void {
  }

  hasChild = (_: number, node: FlattenedFileTree) => node.expandable;

}
