import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectOrderComponent } from './project-order.component';

describe('ProjectOrderComponent', () => {
  let component: ProjectOrderComponent;
  let fixture: ComponentFixture<ProjectOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectOrderComponent],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
