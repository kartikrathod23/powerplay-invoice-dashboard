import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequest =(schema: ZodSchema) =>(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    next();
  };