import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AdditionalOptionService, ReservationService, UnitService } from '@core/services';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { first, forkJoin, switchMap } from 'rxjs';
import { SelectableUnitElement } from '@models/selectable-unit';
import { AdditionalOptionElement } from '@models/additional-option';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: [ './reservation-page.component.scss' ],
  imports: [
    TranslateModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    DatePipe,
    CurrencyPipe,
    NgForOf
  ],
  standalone: true
})
export class ReservationPageComponent implements OnInit {
  public minDate!: Date;
  public dateRangeForm!: FormGroup;
  public optionsForm!: FormGroup;
  public selectedItems: any[] = [];
  public total: number = 0;
  public displayedColumns: string[] = [ 'unitId', 'make', 'model', 'year', 'dailyRate', 'actions' ];
  public dataSource!: MatTableDataSource<SelectableUnitElement>;
  public additionalOptions: AdditionalOptionElement[] = [];

  private liveAnnouncer = inject(LiveAnnouncer);
  private unitService = inject(UnitService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private reservationService = inject(ReservationService);
  private additionalOptionService = inject(AdditionalOptionService);

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  get startDate(): FormControl {
    return this.dateRangeForm.get('startDate') as FormControl;
  }

  get endDate(): FormControl {
    return this.dateRangeForm.get('endDate') as FormControl;
  }

  ngOnInit() {
    this.minDate = new Date();
    this.initForm();
    this.dateRangeForm.valueChanges.subscribe(() => {
      if(this.dateRangeForm.valid && this.startDate?.value && this.endDate?.value) {
        const formattedStartDate = new Date(this.startDate.value).toISOString();
        const formattedEndDate = new Date(this.endDate.value).toISOString();
        this.unitService.getAvailableUnits(formattedStartDate, formattedEndDate).subscribe((response) => {
          const unitsWithSelected: SelectableUnitElement[] = response.map(unit => ({...unit, selected: false}));
          this.dataSource = new MatTableDataSource(unitsWithSelected);
          this.dataSource.sort = this.sort;
        });
      }
    });

    this.additionalOptionService.getAdditionalOptions().subscribe((response) => {
      this.additionalOptions = response;
      this.addCheckboxes();
    });


    this.optionsForm = this.formBuilder.group({
      selectedOptions: this.formBuilder.array([]),
    });
  }

  public announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public onCheckboxChange(element: any) {
    const start = new Date(this.startDate.value);
    const end = new Date(this.endDate.value);
    const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    this.dataSource.data.forEach(item => {
      if(item !== element) {
        item.selected = false;
      }
    });

    if(element.selected) {
      this.total += element.dailyRate * days;
      this.total = Math.round(this.total * 100) / 100;
      this.selectedItems = [ element ];
    } else {
      this.total -= element.dailyRate * days;
      this.total = Math.round(this.total * 100) / 100;
      this.selectedItems = [];
    }
  }

  public submitReservation() {
    this.selectedItems.forEach((item) => {
      const startDate = new Date(this.startDate.value).toISOString();
      const endDate = new Date(this.endDate.value).toISOString();
      item.startDate = startDate;
      item.endDate = endDate;

      item.totalAmount = item.dailyRate * (new Date(endDate).getDate() - new Date(startDate).getDate());

      this.reservationService.addReservation(item).pipe(
        switchMap((response) => {
          const additionalOptionObservables = this.selectedOptions.controls.map((control, index) => {
            if (control.value) {
              return this.additionalOptionService.addAdditionalOptionToReservation(
                this.additionalOptions[index].additionalOptionId,
                response.reservationId
              );
            }
            return null;
          }).filter((observable) => observable !== null);

          return forkJoin(additionalOptionObservables);
        })
      ).subscribe({
        next: () => {
          this.router.navigate(['overview']);
        },
        error: (err) => {
          console.error('Błąd:', err);
        }
      });
    });
  }

  private initForm() {
    this.dateRangeForm = this.formBuilder.group({
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ]
    }, {validators: this.dateRangeValidator});
  }

  private dateRangeValidator(formGroup: FormGroup) {
    const startDate = formGroup.get('startDate')?.value;
    const endDate = formGroup.get('endDate')?.value;

    if(startDate || endDate) {
      return startDate < endDate ? null : {rangeInvalid: true};
    }
    return null;
  }

  private addCheckboxes(): void {
    this.additionalOptions.forEach(() => {
      const control = this.formBuilder.control(false) as FormControl;
      this.selectedOptions.push(control);
    });
  }

  get selectedOptions(): FormArray<FormControl> {
    return this.optionsForm.get('selectedOptions') as FormArray<FormControl>;
  }
}
