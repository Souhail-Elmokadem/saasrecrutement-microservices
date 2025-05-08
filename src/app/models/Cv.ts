export interface Cv{
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    gender: string;
    profession: string;
    profile: string;
    competences: string[];
    centreInterets: string[];
    experience: Experience[];
    formations: Formation[];
}

export interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
  }
  
  export interface Formation {
    diploma: string;
    school: string;
    year: string;
  }