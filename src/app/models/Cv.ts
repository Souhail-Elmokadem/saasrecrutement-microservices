import { Education } from "./Educations";
import { Experience } from "./Experience";

export interface Cv {
  id:string;
  fullName: string;
  email: string;
  phone: string;
  cvName:string;
  linkedin: string;
  website: string;
  modeleName: string;
  photoUrl: string;
  state: string;
  title:string;
  updatedAt:string;
  country: string;
  summary: string;
  skills: string[];
  experiences: Experience[];
  educations: Education[];
}

