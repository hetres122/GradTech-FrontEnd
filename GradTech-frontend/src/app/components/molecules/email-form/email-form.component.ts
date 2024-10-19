import {Component, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from "@angular/forms";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

import {TranslateModule} from "@ngx-translate/core";

import {InputIconComponent} from "@components/atoms";

@Component({
  selector: "app-email-form",
  standalone: true,
  imports: [
    CommonModule,
    InputIconComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: "./email-form.component.html",
  styleUrls: ["./email-form.component.scss"]
})
export class EmailFormComponent implements OnInit {
  public emailForm!: FormGroup;

  private controlContainer = inject(ControlContainer);

  ngOnInit(): void {
    this.emailForm = this.controlContainer.control?.get("emailGroup") as FormGroup;
  }

  get email(): FormControl {
    return this.emailForm.get("email") as FormControl;
  }
}
