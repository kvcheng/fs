import { Request, Response, NextFunction } from "express";
import { newPatientSchema } from "../utils/patientsUtils";

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParser;