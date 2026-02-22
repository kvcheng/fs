import { Request, Response } from 'express';
import express from 'express';
import patientService from '../services/patientService.ts';
import newPatientParser from '../middleware/newPatientParser.ts';
import { NewPatientEntry, PatientEntry } from '../types/types.ts';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
    res.send(patientService.addPatient(req.body));
});

export default router;