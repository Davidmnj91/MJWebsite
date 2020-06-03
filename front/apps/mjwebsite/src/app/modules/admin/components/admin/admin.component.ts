import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mj-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Projects', cols: 1, rows: 1},
          {title: 'Clients', cols: 1, rows: 1},
          {title: 'Order', cols: 1, rows: 1},
        ];
      }

      return [
        {title: 'Projects', cols: 2, rows: 1},
        {title: 'Clients', cols: 1, rows: 2},
        {title: 'Order', cols: 1, rows: 2},
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
  }
}
