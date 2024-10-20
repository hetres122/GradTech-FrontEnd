import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {UserAuthService} from "@core/services";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule
  ]
})
export class OverviewPageComponent {

  private userAuthService = inject(UserAuthService);
  private router = inject(Router);

  public logout(): void {
    this.userAuthService.logout().subscribe({
      next: () => {
        this.router.navigate(["auth"]);
      }
    });
  }
}
