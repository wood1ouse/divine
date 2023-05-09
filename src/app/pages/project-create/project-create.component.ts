import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsFacade } from '@facades/projects.facade';

@Component({
  selector: 'divine-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private projectsFacade: ProjectsFacade) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  createProject() {
    const { name, description } = this.projectForm.value;

    this.projectsFacade.dispatchCreateProject(name, description);
  }
}
