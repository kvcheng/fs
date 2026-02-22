import diagnosisData from '../data/diagnoses';
import { DiagnosisEntry } from '../types/types';

const diagnosis: DiagnosisEntry[] = diagnosisData;

const getEntries = (): DiagnosisEntry[] => {
  return diagnosis;
};

export default {
  getEntries
};