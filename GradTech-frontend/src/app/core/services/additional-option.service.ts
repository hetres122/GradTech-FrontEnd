import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AdditionalOptionElement } from '@models/additional-option';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdditionalOptionService {
  private http = inject(HttpClient);
  private readonly API_URL: URL = new URL(environment.apiUrl);

  public getAdditionalOptions(): Observable<AdditionalOptionElement[]> {
    const url = `${this.API_URL}api/AdditionalOption`;

    return this.http.get<AdditionalOptionElement[]>(url, {
      withCredentials: true,
    });
  }

  public getAdditionalOption(additionalOptionId: number): Observable<AdditionalOptionElement> {
    const url = `${this.API_URL}api/AdditionalOption/${additionalOptionId}`;

    return this.http.get<AdditionalOptionElement>(url, {
      withCredentials: true,
    });
  }

  public addAdditionalOption(additionalOption: AdditionalOptionElement): Observable<AdditionalOptionElement> {
    const url = `${this.API_URL}api/AdditionalOption`;

    return this.http.post<AdditionalOptionElement>(url, additionalOption, {
      withCredentials: true,
    });
  }

  public updateAdditionalOption(additionalOption: AdditionalOptionElement): Observable<AdditionalOptionElement> {
    const url = `${this.API_URL}api/AdditionalOption`;

    return this.http.put<AdditionalOptionElement>(url, additionalOption, {
      withCredentials: true,
    });
  }

  public deleteAdditionalOption(additionalOptionId: number): Observable<void> {
    const url = `${this.API_URL}api/AdditionalOption/${additionalOptionId}`;

    return this.http.delete<void>(url, {
      withCredentials: true,
    });
  }

  public addAdditionalOptionToReservation(additionalOptionId: number, reservationId: number): Observable<void> {
    const url = `${this.API_URL}api/AdditionalOption/${additionalOptionId}/${reservationId}`;

    return this.http.post<void>(url, {},{
      withCredentials: true,
    });
  }
}
