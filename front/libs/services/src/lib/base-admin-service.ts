import { HttpClient } from "@angular/common/http";
import { Model } from "@front/models";

export abstract class BaseAdminService<T extends Model> {

  constructor(
    protected http: HttpClient,
    protected basePath: string
  ) {
  }

  getAll() {
    return this.http.get<T[]>(this.basePath);
  }

  getOne(id: string) {
    return this.http.get<T>(`${this.basePath}/${id}`);
  }

  create(dto: T) {
    this.http.post<T>(this.basePath, dto);
  }

  save(dto: T) {
    return this.http.put<T>(`${this.basePath}/${dto.id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.basePath}/${id}`);
  }
}
