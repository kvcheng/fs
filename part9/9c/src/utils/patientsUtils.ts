import { Gender } from "../types/types";
import { z } from 'zod';

export const newPatientSchema = z.object({
    name: z.string(),
    // .date() is deprecated, new form also validates in form 'YYYY-MM-DD'
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});