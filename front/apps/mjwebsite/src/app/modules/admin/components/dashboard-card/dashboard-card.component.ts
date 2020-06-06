import { Component, Directive } from '@angular/core';

@Directive({selector: 'mj-dash-card-title, [mj-dash-card-title]'})
export class DashboardCardTitle {

}

@Directive({selector: 'mj-dash-card-content, [mj-dash-card-content]'})
export class DashboardCardContent {

}

@Directive({selector: 'mj-dash-card-actions, [mj-dash-card-actions]'})
export class DashboardCardActions {

}


@Component({
  selector: 'mj-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  constructor() {
  }

}
