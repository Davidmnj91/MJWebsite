import { Client } from "./client";
import { Model } from "./model";

export interface Project extends Model {
  name: string;
  order: number;
  client: Client;
}
