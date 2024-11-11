import {Component, inject} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UnitService} from "@core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {first, tap} from "rxjs";

@Component({
  selector: 'app-unit-add-page',
  templateUrl: './unit-add-page.component.html',
  styleUrls: ['./unit-add-page.component.scss'],
  imports: [
    TranslateModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class UnitAddPageComponent {
  public unitForm!: FormGroup;
  public isEdit = false;

  private formBuilder = inject(FormBuilder);
  private unitService = inject(UnitService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.initForm();

    this.activeRoute.params.pipe(
      tap((params) => this.isEdit = !!params['unitId']),
      first(),
    ).subscribe((params) => {
      if (params['unitId']) {
        this.unitService.getUnit(params['unitId']).subscribe((response) => {
          this.unitForm.patchValue(response);
        });
      }
    });
  }

  public onSubmit() {
    if (this.unitForm.invalid) {
      this.unitForm.markAllAsTouched();
      return;
    }

    this.isEdit ? this.updateUnit() : this.addUnit();
  }

  private initForm() {
    this.unitForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      dailyRate: ['', Validators.required],
    });
  }

  private addUnit() {
    this.unitService.addUnit(this.unitForm.value).subscribe(() => {
      this.router.navigate(['units']);
    });
  }

  private updateUnit() {
    const unitId = this.activeRoute.snapshot.params['unitId'];
    const unit = this.unitForm.value;
    unit.unitId = unitId;

    this.unitService.updateUnit(unit).subscribe(() => {
      this.router.navigate(['units']);
    });
  }

}
