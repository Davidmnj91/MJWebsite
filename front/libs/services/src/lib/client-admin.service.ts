import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Client } from "@front/models";
import { BaseAdminService } from "./base-admin-service";

@Injectable({providedIn: "root"})
export class ClientAdminService extends BaseAdminService<Client> {

  constructor(protected http: HttpClient) {
    super(http, 'client');
  }
}
