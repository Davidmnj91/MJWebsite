import { NextFunction, Request, Response } from 'express';
import { ValidationErrors } from '../domain/ModelValidator';

export abstract class BaseController {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(req: Request, res: Response, next?: NextFunction): void {
    this.req = req;
    this.res = res;
    this.next = next;

    this.executeImpl();
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(dto?: T) {
    if (dto) {
      return this.res.status(200).json(dto);
    } else {
      return this.res.sendStatus(201);
    }
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(this.res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(message?: string) {
    return BaseController.jsonResponse(this.res, 401, message ? message : 'Unauthorized');
  }

  public forbidden(message?: string) {
    return BaseController.jsonResponse(this.res, 403, message ? message : 'Forbidden');
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(this.res, 404, message ? message : 'Not found');
  }

  public todo() {
    return BaseController.jsonResponse(this.res, 400, 'TODO');
  }

  public invalidEntity(error: ValidationErrors<any>) {
    return this.res.status(422).json(error);
  }

  public invalid(code: number, error?) {
    return error ? this.res.status(code).json(error) : this.res.status(code);
  }

  public fail(error: any) {
    return this.res.status(500).json(error);
  }
}
