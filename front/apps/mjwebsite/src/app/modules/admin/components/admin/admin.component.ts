import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { AdminComponentKeys } from "../../dynamic/admin-component-factory.service";

export interface AdminDashboardCard {
  title: string,
  cols: number,
  rows: number,
  component: AdminComponentKeys
}

@Component({
  selector: 'mj-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit, AfterViewInit {
  /** Based on the screen size, switch from standard to one column per row */
  cols = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(({matches}) => (matches ? 1 : 2)));

  /** Based on the screen size, switch from standard to one column per row */
  cards: Observable<AdminDashboardCard[]> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Projects', cols: 1, rows: 1, component: 'project-list'},
          {title: 'Clients', cols: 1, rows: 1, component: 'client-list'},
          {title: 'Project Order', cols: 1, rows: 1, component: 'project-order'}
        ];
      }

      return [
        {title: 'Projects', cols: 2, rows: 1, component: 'project-list'},
        {title: 'Clients', cols: 1, rows: 2, component: 'client-list'},
        {title: 'Project Order', cols: 1, rows: 2, component: 'project-order'}
      ];
    })
  );

  editingProject = false;
  editingClient = false;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }
}
