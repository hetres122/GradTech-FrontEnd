import { Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {UnitService} from "@core/services";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {UnitElement} from "@models/unit";

@Component({
  selector: 'app-units-page',
  templateUrl: './units-page.component.html',
  styleUrls: ['./units-page.component.scss'],
  imports: [
    MatTableModule,
    MatSortModule,
    TranslateModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatMenuModule
  ],
  standalone: true
})
export class UnitsPageComponent implements OnInit {
  public displayedColumns: string[] = ['unitId', 'make', 'model', 'dailyRate', 'actions'];
  public dataSource!: MatTableDataSource<UnitElement>;

  private liveAnnouncer = inject(LiveAnnouncer);
  private unitService = inject(UnitService);

  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  ngOnInit() {
    this.unitService.getUnits().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
    });

  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public editUnit(element: UnitElement) {
    console.log('Edycja jednostki:', element);
  }

  public deleteUnit(element: UnitElement) {
    this.unitService.deleteUnit(element.unitId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((unit) => unit.unitId !== element.unitId);
    });
  }

}
