import { ICountyBrowse } from "src/app/county/data/county.browse";
import { IMajorBrowse } from "src/app/major/data/major.browse";

export interface ICityBrowse {
    cityId: number;
    name: string;
    postCode: number;
    major: IMajorBrowse;
    noOfCitizens: number;
    county: ICountyBrowse;
}