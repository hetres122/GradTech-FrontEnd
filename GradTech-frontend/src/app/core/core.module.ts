import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

import {MatToolbarModule} from "@angular/material/toolbar";

import {HeaderComponent} from "./components";


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    NgOptimizedImage,
    TranslateModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule {
}
