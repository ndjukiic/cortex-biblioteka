import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, map, of } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Injectable()
export class ActiveUserProvider {

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router) {}

  getActiveUser(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.getActiveUser()
      .pipe(
        catchError(() => {
          if (this.location.path().indexOf('/auth') === -1) {
            this.router.navigate(['/auth']);
          }

          resolve(false);
          return of(false);
        }),
        map((isLoggedIn) => {
          if (!isLoggedIn && this.location.path().indexOf('/auth') === -1) {
            this.router.navigate(['/auth']);
            resolve(false);
            return;
          }

          resolve(true);
        })
      )
      .subscribe();
    });

  }

}
