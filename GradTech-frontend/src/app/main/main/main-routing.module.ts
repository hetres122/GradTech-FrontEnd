import {RouterModule, Routes} from "@angular/router";
import {canActivate} from "@core/Auth/auth.guard";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [canActivate],
    children: [
      {
        path: "overview",
        loadComponent: () => import("@pages/overview-page/overview-page.component").then(c => c.OverviewPageComponent),
        title: "Przegląd",
      },
      {
        path: "units",
        loadComponent: () => import("@pages/units-page/units-page.component").then(c => c.UnitsPageComponent),
        title: "Pojazdy",
      },
      {
        path: "units/add",
        loadComponent: () => import("@pages/unit-add-page/unit-add-page.component").then(c => c.UnitAddPageComponent),
        title: "Dodaj pojazd",
      },
      {
        path: "units/:unitId",
        loadComponent: () => import("@pages/unit-add-page/unit-add-page.component").then(c => c.UnitAddPageComponent),
        title: "Edytuj pojazd",
      },
      {
        path: "reservation",
        loadComponent: () => import("@pages/reservation-page/reservation-page.component").then(c => c.ReservationPageComponent),
        title: "Rezerwacje",
      },
      {
        path: "additional-option",
        loadComponent: () => import("@pages/additional-option/additional-option.component").then(c => c.AdditionalOptionComponent),
        title: "Dodatkowe opcje",
      },
      {
        path: "additional-option/add",
        loadComponent: () => import("@pages/additional-option-add-page/additional-option-add-page.component").then(c => c.AdditionalOptionAddPageComponent),
        title: "Dodaj dodatkową opcję",
      },
      {
        path: "additional-option/:additionalOptionId",
        loadComponent: () => import("@pages/additional-option-add-page/additional-option-add-page.component").then(c => c.AdditionalOptionAddPageComponent),
        title: "Edytuj dodatkową opcję",
      },
      {
        path: "",
        redirectTo: "overview",
        pathMatch: "full",
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class MainRoutingModule {
}
