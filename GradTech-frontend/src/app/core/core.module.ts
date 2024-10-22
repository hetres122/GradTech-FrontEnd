import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

import {MatToolbarModule} from "@angular/material/toolbar";

import {HeaderComponent} from "./components";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [HeaderComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        NgOptimizedImage,
        TranslateModule,
        MatButtonModule
    ],
  exports: [HeaderComponent]
})
export class CoreModule {
}
