import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {canActivate} from "@core/Auth/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    loadComponent: () => import("./pages/auth-page/auth-page.component").then(c => c.AuthPageComponent),
    title: "Autoryzacja",
  },
  {
    path: "reset-password",
    loadComponent: () => import("./pages/password-reset-page/password-reset-page.component").then(c => c.PasswordResetPageComponent),
    title: "Reset Hasła",
  },{
    path: "overview",
    loadComponent: () => import("./pages/overview-page/overview-page.component").then(c => c.OverviewPageComponent),
    title: "Przegląd",
    canActivate: [canActivate],
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "auth",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
