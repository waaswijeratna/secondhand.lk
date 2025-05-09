import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})

export class UserLocationService {

    constructor(private http: HttpClient) {}

    getLocation(){
        return this.http.get('https://ipapi.co/json')
    }
}