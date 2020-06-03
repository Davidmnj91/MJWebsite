import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "@front/models";
import { BaseAdminService } from "./base-admin-service";

@Injectable({providedIn: "root"})
export class ProjectAdminService extends BaseAdminService<Project> {

  constructor(http: HttpClient) {
    super(http, 'project');
  }
}
