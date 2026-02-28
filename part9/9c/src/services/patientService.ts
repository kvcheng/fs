import patientData from '../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types/types';
import { v1 as uuid } from 'uuid';

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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): PatientEntry => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }

    const entries = patient.entries ? patient.entries : [];
    return ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        entries,
        ssn: patient.ssn
    });
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatient
};