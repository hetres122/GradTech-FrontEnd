import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { AdditionalOptionService } from '@core/services';

@Component({
  selector: 'app-additional-option-add-page',
  standalone: true,
	imports: [ CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslateModule ],
  templateUrl: './additional-option-add-page.component.html',
  styleUrls: ['./additional-option-add-page.component.scss']
})
export class AdditionalOptionAddPageComponent {
  public additionalOptionForm!: FormGroup;
  public isEdit = false;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private additionalOptionService = inject(AdditionalOptionService);

  ngOnInit() {
    this.initForm();

    this.activeRoute.params.pipe(
      tap((params) => this.isEdit = !!params['additionalOptionId']),
      first(),
    ).subscribe((params) => {
      if (params['additionalOptionId']) {
        this.additionalOptionService.getAdditionalOption(params['additionalOptionId']).subscribe((response) => {
          this.additionalOptionForm.patchValue(response);
        });
      }
    });
  }

  public onSubmit() {
    if (this.additionalOptionForm.invalid) {
      this.additionalOptionForm.markAllAsTouched();
      return;
    }

    this.isEdit ? this.updateUnit() : this.addUnit();
  }

  private initForm() {
    this.additionalOptionForm = this.formBuilder.group({
      optionName: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  private addUnit() {
    this.additionalOptionService.addAdditionalOption(this.additionalOptionForm.value).subscribe(() => {
      this.router.navigate(['additional-option']);
    } );
  }

  private updateUnit() {
    const additionalOptionId = this.activeRoute.snapshot.params['additionalOptionId'];
    const unit = this.additionalOptionForm.value;
    unit.additionalOptionId = additionalOptionId;

    this.additionalOptionService.updateAdditionalOption(unit).subscribe(() => {
      this.router.navigate(['additional-option']);
    });
  }

}
