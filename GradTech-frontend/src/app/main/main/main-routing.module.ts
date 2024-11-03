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
