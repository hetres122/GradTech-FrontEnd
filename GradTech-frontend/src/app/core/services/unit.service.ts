import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Observable} from "rxjs";
import {UnitElement} from "@models/unit";
@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private http = inject(HttpClient);
  private readonly API_URL: URL = new URL(environment.apiUrl);

  public getUnits(): Observable<UnitElement[]> {
    const url = `${this.API_URL}api/Unit`;

    return this.http.get<UnitElement[]>(url, {
      withCredentials: true,
    });
  }

  public addUnit(unit: UnitElement): Observable<UnitElement> {
    const url = `${this.API_URL}api/Unit`;

    return this.http.post<UnitElement>(url, unit, {
      withCredentials: true,
    });
  }

  public getUnit(unitId: number): Observable<UnitElement> {
    const url = `${this.API_URL}api/Unit?unitid=${unitId}`;

    return this.http.get<UnitElement>(url, {
      withCredentials: true,
    });
  }

  public deleteUnit(unitId: number): Observable<UnitElement> {
    const url = `${this.API_URL}api/Unit?unitid=${unitId}`;

    return this.http.delete<UnitElement>(url, {
      withCredentials: true,
    });
  }

  public updateUnit(unit: UnitElement): Observable<UnitElement> {
    const url = `${this.API_URL}api/Unit?unitid=${unit.unitId}`;

    return this.http.put<UnitElement>(url, unit, {
      withCredentials: true,
    });
  }
}
