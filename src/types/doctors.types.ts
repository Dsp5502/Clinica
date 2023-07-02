export type DoctorsResponse = {
  total: number;
  doctors: Doctor[];
  map?: (arg0: (doctor: Doctor) => JSX.Element) => JSX.Element[];
};

export type Doctor = {
  _id: string;
  firstName: string;
  lastName: string;
  specialtyId: string;
  office: string;
  contactEmail: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
};
