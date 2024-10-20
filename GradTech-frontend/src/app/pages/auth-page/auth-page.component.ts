import {Component, inject, OnInit, ViewChild} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";

import {RegisterComponent, LoginComponent} from "@components/organisms";
import {UserAuthService} from "@core/services";
import {Router} from "@angular/router";

@Component({
  standalone: true,
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  imports: [
    MatTabsModule,
    RegisterComponent,
    LoginComponent,
    TranslateModule
  ],
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit {
  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;

  private userAuthService = inject(UserAuthService);
  private router = inject(Router);
  ngOnInit(): void {
    this.userAuthService.isAuthenticated().subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(["overview"]).then(r => r);
      }
    });
  }

  public changeToLoginTab(): void {
    this.matTabGroup.selectedIndex = 0;
  }
}
