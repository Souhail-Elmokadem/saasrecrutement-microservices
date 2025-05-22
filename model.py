from pydantic import BaseModel
from typing import List, Optional

class Experience(BaseModel):
    job_title: str
    company: str
    start_date: str
    end_date: Optional[str]
    description: Optional[str]

class Education(BaseModel):
    degree: str
    school: str
    start_date: str
    end_date: Optional[str]

class CVModel(BaseModel):
    fullName: Optional[str]
    email: Optional[str]
    tel: Optional[str]
    country: Optional[str]
    gender: Optional[str]
    phone: Optional[str]
    state: Optional[str]
    linkedin: Optional[str]
    website: Optional[str]
    userId: Optional[str]
    profession: Optional[str]
    summary: Optional[str]
    skills: Optional[List[str]]
    experiences: Optional[List[Experience]]
    educations: Optional[List[Education]]
