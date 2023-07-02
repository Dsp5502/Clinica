export type AllPatients = {
  total: number;
  patients: Patient[] | [];
  map?: (arg0: (patient: Patient) => JSX.Element) => JSX.Element[];
};

export type Patient = {
  _id: string;
  name: string;
  identification: string;
  last_name: string;
  age: number;
  phone: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
};
