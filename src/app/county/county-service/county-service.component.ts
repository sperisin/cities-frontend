import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ICountyBrowse } from "../data/county.browse";

@Injectable()
export class CountyService {

    private readonly apiUrl: string = 'http://localhost:8080/api/county';
    constructor(
        private httpClient: HttpClient
    ) {}

    public getCounties(): Observable<any> {
        const url = this.apiUrl + '/crud';
        return this.httpClient.get<ICountyBrowse>(url);
    }

    public getCounty(countyId: number): Observable<any> {
        const url = this.apiUrl + '/crud/' + countyId;
        return this.httpClient.get<ICountyBrowse>(url);
    }

    public deleteCounty(countyId: number): void { 
        const url = this.apiUrl + '/crud';
        this.httpClient.delete(url, { params: { countyId: countyId } } ).subscribe((data) => console.log("success"));
    }

    public updateCounty(countyId: number, countyName: string) {
        const url = this.apiUrl + '/crud/' + countyId;
        this.httpClient.put(url, countyName).subscribe((data) => console.log("success"));
    }

    public insertCounty(countyName: string) {
        const url = this.apiUrl + '/crud';
        this.httpClient.post(url, countyName).subscribe((data) => console.log("success"));
    }

    public searchCounty(countyName: string): Observable<any> {
        const url = this.apiUrl + '/search';
        return this.httpClient.get<ICountyBrowse>(url, { params: { countyName: countyName } });
    }
}