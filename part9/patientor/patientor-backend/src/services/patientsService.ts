import { patientsData } from "../data/patients";
import { Patients, NewPatient } from "../type";
import { v1 as uuid } from "uuid";

export const getAllPatients = (): Omit<Patients, "ssn">[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const findById = (id: string): Patients | undefined => {
  const patient = patientsData.find((p) => p.id === id);
  return patient;
};

export const addNewPatient = (entry: NewPatient): Patients => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const newPatient = { id: uuid(), ...entry };
  patientsData.push(newPatient);
  return newPatient;
};
