import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UserInfoService {
    constructor(private http: HttpClient) { }

    fetchUserDetails() {
        return this.http.get(environment.apiBaseUrl + '/userDetails');
    }
}
