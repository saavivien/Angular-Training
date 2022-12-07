import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token!: string;

    isAuthenticated():Observable<boolean>{
        return of(!!localStorage.getItem('TOKEN'))
    }

    getToken(): string | null {
        return localStorage.getItem('TOKEN');
    }

    login(tokenToBeEncoded:string){
        localStorage.setItem('TOKEN', btoa(tokenToBeEncoded));
    }
    logout():void{
        localStorage.removeItem('TOKEN')
    }
}