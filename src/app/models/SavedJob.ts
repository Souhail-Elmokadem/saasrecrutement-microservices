import { JobOffersComponent } from "../shared/pages/candidate/job-offers/job-offers.component";
import { Offer } from "./Offre";

export interface SavedJob {
    savedJobId: number;
     job:Offer;
}