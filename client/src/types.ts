export interface HospitalState {
  name: string;
  address: string;
  createdAt: Date;
  doctors?: DoctorUser[]; // References to Doctors
  patients?: PatientUser[]; // References to Patients
  image?: IImage; // Image of the Hospital
  __v?: number;
  _id?: string;
}

export interface DoctorUser {
  username: JSX.Element | string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  age: number;
  phoneBook: number;
  createdAt: Date;
  hospital: string; // Reference to Hospital
  specialization?: string; // Optional field for specialization
  startDate: Date;
  endDate: Date;
  startTime?: Date;
  endTime?: Date;
  address?: string;
  patients?: string[]; // References to Patients
  actions?: JSX.Element;
  __v?: number;
  _id?: string;
  id: number;
}

export interface PatientUser {
  username: JSX.Element | string;
  password: string;
  firstName: string;
  lastName: string;
  image: IImage;
  gender: string;
  country: string;
  age: number;
  phoneBook: number;
  createdAt: Date;
  hospital: string; // Reference to Hospital
  address?: string;
  doctors?: string[]; // References to doctors
  actions?: JSX.Element;
  __v?: number;
  _id?: string;
  id: number;
}

export interface IImage {
  data: Buffer;
  contentType: string;
}

export interface AdminUser {
  username: string;
  password: string;
  role: "super-admin" | "hospital-admin";
  hospital?: string[]; // Reference to Hospital
  createdAt?: Date;
  __v?: number;
  _id?: string;
}
