import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-request";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err: any) {
      let exception: HttpException;
      if (err instanceof HttpException) {
        exception = err;
      } else {
        if (err instanceof ZodError) {
          exception = new BadRequestException(
            "Unprocessable entity",
            ErrorCode.UNPROCESSABLE_ENITITY,
            err,
          );
        } else {
          exception = new InternalException(
            "Something went wrong",
            err,
            ErrorCode.INTERNAL_EXCEPTION
          );
        }
      }
      next(exception);
    }
  };
};
