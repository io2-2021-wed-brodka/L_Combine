import { Observable, of } from "rxjs";
import LoginData from "src/app/models/loginData";

export default {
    loggedIn: false,
    
    isLoggedIn(): boolean {
        return this.loggedIn;
    },
    
    login(loginData: LoginData): Observable<boolean> {
        this.loggedIn = true;
        return of(this.loggedIn);
    },

    logout(): void {
        this.loggedIn = false;
    }
}