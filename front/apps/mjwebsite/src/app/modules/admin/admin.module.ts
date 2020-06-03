import { DragDropModule } from "@angular/cdk/drag-drop";
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AdminRoutingModule } from "./admin.routing.module";
import { AdminComponent } from './components/admin/admin.component';
import { ClientFormComponent } from "./components/client-form/client-form.component";
import { ClientListComponent } from "./components/client-list/client-list.component";
import { ProjectFormComponent } from "./components/project-form/project-form.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { ProjectOrderComponent } from "./components/project-order/project-order.component";
import { DynamicFieldDirective } from "./dynamic/dynamic-field.directive";


@NgModule({
  declarations: [
    AdminComponent,
    ClientFormComponent,
    ClientListComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ProjectOrderComponent,
    DynamicFieldDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexModule,
    AdminRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DragDropModule
  ]
})
export class AdminModule {
}
