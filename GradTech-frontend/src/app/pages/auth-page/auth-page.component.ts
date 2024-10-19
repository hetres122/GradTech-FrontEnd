import {Component, ViewChild} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";

import {RegisterComponent, LoginComponent} from "@components/organisms";

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
export class AuthPageComponent {
  @ViewChild('matTabGroup') matTabGroup!: MatTabGroup;

  public changeToLoginTab(): void {
    this.matTabGroup.selectedIndex = 0;
  }
}
