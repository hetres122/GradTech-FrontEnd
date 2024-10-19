import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  standalone: true,
  selector: "app-button-submit",
  templateUrl: "./button-submit.component.html",
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  styleUrls: ["./button-submit.component.scss"]
})
export class ButtonSubmitComponent {
  @Input({ required: false }) public isValid!: boolean;
  @Input({ required: true }) public isLoading!: boolean;
}
