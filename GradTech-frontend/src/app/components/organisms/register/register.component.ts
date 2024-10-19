import {Component, EventEmitter, inject, OnInit, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {Observable} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {PasswordValidationOptionalErrors} from "@models/password-validation";
import {ButtonSubmitComponent, InputIconComponent} from "@components/atoms";
import {EmailFormComponent} from "@components/molecules"
import {UserAuthService} from "@core/services";


@Component({
  standalone: true,
  selector: "app-register",
  templateUrl: "./register.component.html",
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    InputIconComponent,
    MatProgressSpinnerModule,
    EmailFormComponent,
    ButtonSubmitComponent,
    TranslateModule,
  ],
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  @Output() onChangeToDefaultTab = new EventEmitter<void>();

  public registerForm!: FormGroup;
  public errorMessage!: Observable<string>;
  public isError: boolean = false;
  public isLoading: boolean = false;

  private formBuilder = inject(FormBuilder);
  private userAuthService = inject(UserAuthService);
  private translate = inject(TranslateService);


  get email(): FormControl {
    return this.registerForm.get("emailGroup.email") as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get("password") as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.registerForm.get("confirmPassword") as FormControl;
  }

  ngOnInit(): void {
    this.setRegisterFormControls();
  }

  public onSubmit(): void {
    const email = this.email.value.trim();
    const password = this.password.value.trim();

    this.isLoading = true;
    this.userAuthService.register({email, password}).subscribe({
      next: () => {
        this.isError = false;
        this.onChangeToDefaultTab.emit();
      },
      error: () => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = this.translate.get("messageErrorSend");
      },
      complete: () => {
        this.resetRegisterForm();
        this.isLoading = false;
      },
    });
  }

  private setRegisterFormControls(): void {
    this.registerForm = this.formBuilder.group({
        emailGroup: this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
        }),
        password: ["",
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ["", [Validators.required]],
      },
      {validators: this.passwordMatchValidator}
    );
  }

  private passwordValidator(control: FormControl): PasswordValidationOptionalErrors {
    const {value} = control;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);

    const errors: PasswordValidationOptionalErrors = {};

    !hasUpperCase && (errors["missingUpperCase"] = true);
    !hasLowerCase && (errors["missingLowerCase"] = true);
    !hasDigit && (errors["missingDigit"] = true);

    return errors;
  }

  private passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get("password");
    const confirmPassword = formGroup.get("confirmPassword");

    if (password && confirmPassword) {
      const error = password.value === confirmPassword.value ? null : {passwordMismatch: true};
      confirmPassword.setErrors(error);
    }
  }

  private resetRegisterForm(): void {
    this.registerForm.reset();
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.get(key)?.setErrors(null);
    });
  }
}
