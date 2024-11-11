import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdditionalOptionTable } from '@models/additional-option-table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSortModule, Sort } from '@angular/material/sort';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AdditionalOptionService } from '@core/services';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-additional-option',
  templateUrl: './additional-option.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    TranslateModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  styleUrls: [ './additional-option.component.scss' ]
})
export class AdditionalOptionComponent implements OnInit {
  public displayedColumns: string[] = ['additionalOptionId', 'optionName', 'price', 'actions' ];
  public dataSource!: MatTableDataSource<AdditionalOptionTable>;

  private liveAnnouncer = inject(LiveAnnouncer);
  private additionalOptionService = inject(AdditionalOptionService);
  private router = inject(Router);

  ngOnInit() {
    this.additionalOptionService.getAdditionalOptions().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
  public announceSortChange(sortState: Sort) {
    if(sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public deleteAdditionalOption(element: AdditionalOptionTable) {
    this.additionalOptionService.deleteAdditionalOption(element.additionalOptionId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((option) => option.additionalOptionId !== element.additionalOptionId);
    } );
  }

  public editAdditionalOption(element: AdditionalOptionTable) {
    this.router.navigate(['additional-option', element.additionalOptionId]);
  }
}
