import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mj-project-order',
  templateUrl: './project-order.component.html',
  styleUrls: ['./project-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectOrderComponent {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
