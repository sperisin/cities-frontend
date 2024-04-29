import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ICityBrowse } from "../data/city.browse";

@Injectable()
export class CityService {

    private readonly apiUrl: string = 'http://localhost:8080/api/city';
    constructor(
        private httpClient: HttpClient
    ) {}

    public getCities(): Observable<any> {
        const url = this.apiUrl + '/crud';
        return this.httpClient.get(url);
    }

    public getCity(cityId: number): Observable<any> {
        const url = this.apiUrl + '/crud/' + cityId;
        return this.httpClient.get<ICityBrowse>(url);
    }

    public deleteCity(cityId: number): void { 
        const url = this.apiUrl + '/crud';
        this.httpClient.delete(url, { params: { cityId: cityId } } ).subscribe((data) => console.log("success"));
    }

    public updateCity(cityId: number, cityName: string, postCode: number, majorId: number, noOfCitizens: number, countyId: number) {
        const url = this.apiUrl + '/crud/' + cityId;
        this.httpClient.put(url, {}, { params: { name: cityName, postCode: postCode, majorId: majorId, noOfCitizens: noOfCitizens, countyId: countyId } }).subscribe((data) => console.log("success"));
    }

    public insertCity(cityName: string, postCode: number, majorId: number, noOfCitizens: number, countyId: number) {
        const url = this.apiUrl + '/crud';
        this.httpClient.post(url, {}, { params: { name: cityName, postCode: postCode, majorId: majorId, noOfCitizens: noOfCitizens, countyId: countyId } }).subscribe((data) => console.log("success"));
    }

    public searchCity(cityName: string): Observable<any> {
        const url = this.apiUrl + '/search';
        return this.httpClient.get<ICityBrowse>(url, { params: { searchTerm: cityName } });
    }
}