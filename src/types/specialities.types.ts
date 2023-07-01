export interface SpecialitiesResponse {
  total: number;
  patients: Speciality[];
  map?: (arg0: (speciality: Speciality) => JSX.Element) => JSX.Element[];
}

export interface Speciality {
  _id: string;
  title: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}
