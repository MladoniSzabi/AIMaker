import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {

  projectList: string[] = []

  constructor(
    private backendService: BackendService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.backendService.getProjectList().subscribe((projects) => {
      this.projectList = projects
    })
  }

  ngOnInit(): void {
  }

  createNewProject() {
    this.modalService.createInputModal(
      "Enter project name: ",
      (projectName: string) => {
        this.backendService.createNewProject(projectName)
        ///TODO:need to create a view like the blank page to pick a file in an open project
        ///but for now just open a predetermined file in the project
        this.router.navigate([projectName, "main"])
      },
      () => {}
    )
    return false
  }

}
