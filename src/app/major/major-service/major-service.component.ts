import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { IMajorBrowse } from "../data/major.browse";

@Injectable()
export class MajorService {

    private readonly apiUrl: string = 'http://localhost:8080/api/major';
    constructor(
        private httpClient: HttpClient
    ) {}

    public getMajors(): Observable<any> {
        const url = this.apiUrl + '/crud';
        return this.httpClient.get<IMajorBrowse>(url);
    }

    public getMajor(majorId: number): Observable<any> {
        const url = this.apiUrl + '/crud/' + majorId;
        return this.httpClient.get<IMajorBrowse>(url);
    }

    public deleteMajor(majorId: number): void { 
        const url = this.apiUrl + '/crud';
        this.httpClient.delete(url, { params: { majorId: majorId } } ).subscribe((data) => console.log("success"));
    }

    public updateMajor(majorId: number, majorName: string, majorSurname: string) {
        const url = this.apiUrl + '/crud/' + majorId;
        this.httpClient.put(url, {}, { params: { majorName: majorName, majorSurname: majorSurname } }).subscribe((data) => console.log("success"));
    }

    public insertMajor(majorName: string, majorSurname: string) {
        const url = this.apiUrl + '/crud';
        this.httpClient.post(url, {}, { params: { majorName: majorName, majorSurname: majorSurname } }).subscribe((data) => console.log("success"));
    }

    public searchMajor(majorNameSurname: string): Observable<any> {
        const url = this.apiUrl + '/search';
        return this.httpClient.get<IMajorBrowse>(url, { params: { searchTerm: majorNameSurname } });
    }
}