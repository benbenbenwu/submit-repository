export enum Gender {
  Male = "male",
  Female = "female",
}
export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<Patients, "id">;
