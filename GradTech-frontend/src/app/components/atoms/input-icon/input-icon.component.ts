import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";

@Component({
  standalone: true,
  selector: "app-input-icon",
  templateUrl: "./input-icon.component.html",
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule
  ],
  styleUrls: ["./input-icon.component.scss"]
})
export class InputIconComponent {
  @Input({ required: true }) public isInputValid!: boolean;
  @Input({ required: true }) public isTouched!: boolean;
}
