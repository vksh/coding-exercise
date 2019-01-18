import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(authCredentials) {
        return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials);
    }
    
    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        if (this.getToken())
            return true;
        else
            return false;
    }
}
