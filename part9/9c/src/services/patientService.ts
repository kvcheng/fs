import patientData from '../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types/types';

const patients: PatientEntry[] = patientData;

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries,
    getNonSensitiveEntries
};