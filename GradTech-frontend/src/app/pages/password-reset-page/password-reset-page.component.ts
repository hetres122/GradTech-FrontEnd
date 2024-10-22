import {Component, inject, OnInit} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from '@ngx-translate/core';
import {Observable} from "rxjs";


import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {ButtonSubmitComponent, InputIconComponent} from "@components/atoms";
import {EmailFormComponent} from "@components/molecules"
import {UserAuthService} from "@core/services";
import {MatCardModule} from "@angular/material/card";

@Component({
  standalone: true,
  selector: "app-password-reset-page",
  templateUrl: "./password-reset-page.component.html",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputIconComponent,
    CommonModule,
    EmailFormComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    RouterLink,
    ButtonSubmitComponent,
    TranslateModule,
    MatCardModule,
  ],
  styleUrls: ["./password-reset-page.component.scss"],
})
export class PasswordResetPageComponent implements OnInit {
  public resetForm!: FormGroup;
  public showMessage: boolean = false;
  public responseMessage!: Observable<string>;
  public isError: boolean = false;
  public isLoading: boolean = false;

  private formBuilder = inject(FormBuilder);
  private userAuthService = inject(UserAuthService);
  private translate = inject(TranslateService);

  get email(): FormControl {
    return this.resetForm.get("emailGroup.email") as FormControl;
  }

  ngOnInit(): void {
    this.setResetFormControls();
  }

  public onSubmit(): void {
    const email = this.email.value.trim();
    this.isLoading = true;

    this.userAuthService.resetPassword({email}).subscribe({
      next: () => {
        this.responseMessage = this.translate.get("messageAlreadySent");
        this.isError = false;
        this.resetForm.reset();
        this.email.setErrors(null);
      },
      error: () => {
        this.isError = true;
        this.isLoading = false;
        this.showMessage = true
        this.responseMessage = this.translate.get("messageErrorEmailExist");
      },
      complete: () => {
        this.showMessage = true;
        this.isLoading = false;
      },
    });
  }

  private setResetFormControls(): void {
    this.resetForm = this.formBuilder.group({
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      })
    });
  }
}
