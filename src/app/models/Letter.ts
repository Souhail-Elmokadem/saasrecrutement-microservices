import { Cv } from "./Cv";

export interface Letter{
    id?: string;
    object: string;
    content: string;
    updatedAt?: string;
    cv?:Cv;
}