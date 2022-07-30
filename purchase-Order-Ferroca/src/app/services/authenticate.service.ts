import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
//import { ErrorsService } from './errors.service';
//import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

 // private url = environment.security.server + environment.security.url;
 // private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 // private currentSession: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);

  constructor(    
     private http: HttpClient,
   // private errorService: ErrorsService,
   // private storageService: LocalStorageService
   )
  {
  }
  /*
  get isLoggedIn() { return this.loggedIn$.asObservable(); }

  login(username: string, password: string): Observable<Session> {
    return this.http
      .post<Session>(`${this.url}authenticate`, { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            this.setCurrentSession(user);

            // Save session in local storage
            this.storageService.save(this.storageService.USER_LOGED, user)
              .subscribe(() => {
                this.loggedIn$.next(true);
              },
                error => (console.error(error)),
                () => console.log('[storage] complete'));
          }
          return user;
        })
      );
  }

  getCurrentSession(): Observable<Session> {
    return this.currentSession.asObservable();
  }

  setCurrentSession(session: Session) {
    this.currentSession.next(session);
  }

  logout(): void {
    this.storageService.delete(this.storageService.USER_LOGED)
    .subscribe(()=>{
      this.loggedIn$.next(false);
    },
    error => (console.error(error)),
    () => console.log('[storage] deleted'));
  }

  getSession(): Observable<Session> {
    return new Observable<Session>(observer => {
      this.storageService.get(this.storageService.USER_LOGED)
        .subscribe(data => {
          observer.next(data);
        });
    });
  }
  */

  
}
