import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from "@front/models";
import { ClientAdminService } from "@front/services";
import { Observable } from "rxjs";

@Component({
  selector: 'mj-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit {
  projectForm = this.fb.group({
    name: [null, Validators.required],
    order: null,
    client: [null, Validators.required],
    cover: [null, Validators.required],
    photos: this.fb.array([]),
  });

  clients$: Observable<Client[]>

  constructor(
    private fb: FormBuilder,
    private clientAdminService: ClientAdminService
  ) {
  }

  ngOnInit(): void {
    this.clients$ = this.clientAdminService.getAll();
  }

  onSubmit() {
    alert('Thanks!');
  }
}
