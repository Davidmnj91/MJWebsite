import { Client } from "./client";
import { Model } from "./model";

export interface Photo {
  data: string;
}

export interface Project extends Model {
  name: string;
  order: number;
  client: Client;
  cover: Photo;
  photos: Photo[]
}
