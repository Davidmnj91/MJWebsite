import { ComponentType } from "@angular/cdk/overlay";
import { Injectable } from '@angular/core';
import { ClientListComponent } from "../components/client-list/client-list.component";
import { ProjectListComponent } from "../components/project-list/project-list.component";
import { ProjectOrderComponent } from "../components/project-order/project-order.component";

export type AdminComponentKeys = 'project-list' | 'client-list' | 'project-order';

@Injectable()
export class AdminComponentFactoryService {

  private readonly adminComponentsMapper: { [key in AdminComponentKeys]: ComponentType<any> } = {
    'project-list': ProjectListComponent,
    'project-order': ProjectOrderComponent,
    'client-list': ClientListComponent
  }

  constructor() {
  }

  getComponentForKey(key: AdminComponentKeys): ComponentType<any> {
    return this.adminComponentsMapper[key];
  }
}
