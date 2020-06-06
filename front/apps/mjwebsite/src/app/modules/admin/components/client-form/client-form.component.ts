import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mj-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientFormComponent {

  clientForm = this.fb.group({
    name: [null, Validators.required],
    description: null
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    alert('Thanks!');
  }
}
