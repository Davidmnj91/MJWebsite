import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "@front/models";
import { BaseAdminService } from "./base-admin-service";

@Injectable({providedIn: "root"})
export class ClientAdminService extends BaseAdminService<Project> {

  constructor(http: HttpClient) {
    super(http, 'client');
  }
}
