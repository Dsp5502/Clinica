export type DoctorsResponse = {
  total: number;
  doctors: Doctor[];
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
