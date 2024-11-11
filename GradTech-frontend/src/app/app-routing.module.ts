import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

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
  },
  {
    path: "",
    redirectTo: "/overview",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
