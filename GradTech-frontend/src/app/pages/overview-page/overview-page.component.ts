import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ReservationService, UnitService } from '@core/services';
import { ReservationElement } from '@models/reservation';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { forkJoin, map } from 'rxjs';
import { ReservationTable } from '@models/reservation-table';


@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    DatePipe
  ]
})
export class OverviewPageComponent implements OnInit {
  public displayedColumns: string[] = ['reservationId', 'startDate', 'endDate', 'make', 'model', 'totalAmount', 'actions' ];
  public dataSource!: MatTableDataSource<ReservationTable>;

  private liveAnnouncer = inject(LiveAnnouncer);
  private unitService = inject(UnitService);
  private reservationService = inject(ReservationService);

  ngOnInit() {
    this.reservationService.getReservations().subscribe((response) => {
      const reservations$ = response.map((reservation) => {
        reservation.startDate = new Date(reservation.startDate);
        reservation.endDate = new Date(reservation.endDate);

        return this.unitService.getUnit(reservation.unitId).pipe(
          map((unit) => ({
            ...reservation,
            make: unit.make,
            model: unit.model
          }))
        );
      });

      forkJoin(reservations$).subscribe((reservations) => {
        this.dataSource = new MatTableDataSource(reservations);
      });
    });
  }

  public announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public deleteReservation(element: ReservationElement) {
    this.reservationService.deleteReservation(element.reservationId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((reservation) => reservation.reservationId !== element.reservationId);
    });
  }
}
