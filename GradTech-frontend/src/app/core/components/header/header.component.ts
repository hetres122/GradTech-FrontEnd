import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";
import {UserAuthService} from "@core/services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
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
