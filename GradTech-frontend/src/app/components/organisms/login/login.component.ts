import {Component, inject, OnInit,} from "@angular/core";
import {Router, RouterLink} from "@angular/router";
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

import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ButtonSubmitComponent} from "@components/atoms";
import {EmailFormComponent} from "@components/molecules"
import {UserAuthService} from "@core/services";


@Component({
  standalone: true,
  selector: "app-login",
  templateUrl: "./login.component.html",
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    MatIconModule,
    EmailFormComponent,
    MatProgressSpinnerModule,
    ButtonSubmitComponent,
    TranslateModule,
  ],
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public showMessage: boolean = false;
  public responseMessage!: Observable<string>;
  public isError: boolean = false;
  public isLoading: boolean = false;

  private formBuilder = inject(FormBuilder);
  private userAuthService = inject(UserAuthService);
  private translate = inject(TranslateService);
  private router = inject(Router);

  ngOnInit(): void {
    this.setLoginFormControls();
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  get email(): FormControl {
    return this.loginForm.get("emailGroup.email") as FormControl;
  }

  public onSubmit(): void {
    const email = this.email.value.trim();
    const password = this.password.value.trim();
    this.isLoading = true;

    this.userAuthService.login({email, password}).subscribe({
      next: () => {
        this.isError = false;
        this.responseMessage = this.translate.get("messageSuccessLogin");
        this.router.navigate(["/overview"]);
      },
      error: () => {
        this.isError = true;
        this.showMessage = true;
        this.isLoading = false;
        this.responseMessage = this.translate.get("messageErrorLogin");
      },
      complete: () => {
        this.resetLoginForm();
        this.showMessage = true;
        this.isLoading = false;
      },
    });
  }

  private setLoginFormControls(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      })
    });
  }

  private resetLoginForm(): void {
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.setErrors(null);
    });
  }
}
