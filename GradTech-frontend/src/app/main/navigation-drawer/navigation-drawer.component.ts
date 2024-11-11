import { Component, inject, OnInit } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import { UserAuthService } from '@core/services';

@Component({
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatIconModule,
    TranslateModule
  ],
  standalone: true
})
export class NavigationDrawerComponent implements OnInit {

  private auth = inject(UserAuthService);
  ngOnInit() {
    console.log(this.auth.getRolesFromSession());

  }

  public navLinks = [
    {
      label: 'overview',
      link: 'overview',
      icon: 'dashboard',
    },
    {
      label: 'units',
      link: 'units',
      icon: 'school',
    },
    {
      label: 'reservation',
      link: 'reservation',
      icon: 'event',
    },
    {
      label: 'additional',
      link: 'additional-option',
      icon: 'add',
    },
  ];
}
