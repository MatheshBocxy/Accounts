import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiservicesService {
  constructor(private http: HttpClient) { }

  apiPostCall(endURL: string, postPara: any): Observable<any> {
    let finalURL = API_URL + endURL;
    return this.http.post<any>(finalURL, postPara).pipe(catchError(this.handleError));
  }

  apiPostCall_Query(endURL: string, params: { [key: string]: string }): Observable<any> {
    let finalURL = API_URL + endURL;
    let httpParams = new HttpParams();

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }
    return this.http.post(finalURL, {}, { params: httpParams });
  }

  apiPostCall_beRbe(endURL: string, params: { [key: string]: string }): Observable<any> {
    let finalURL = API_URL + endURL;
    let httpParams = new HttpParams();

    // Add each key-value pair to the HttpParams
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.post(finalURL, {}, { params: httpParams });
  }

  apiGetCall(endURL: string): Observable<any> {
    let finalURL = API_URL + endURL;
    return this.http.post<any>(finalURL, {}).pipe(catchError(this.handleError));
  }
  apiPutCall(endURL: string, putPara: any): Observable<any> {
    let finalURL = API_URL + endURL;
    return this.http
      .post<any>(finalURL, putPara)
      .pipe(catchError(this.handleError));
  }
  apiDeleteCall(endURL: string, id: any): Observable<any> {
    let finalURL = API_URL + endURL + id;
    return this.http.post<any>(finalURL, id).pipe(catchError(this.handleError));
  }


  apiGetCall_get(endURL: string): Observable<any> {
    let finalURL = API_URL + endURL;
    return this.http.get<any>(finalURL).pipe(catchError(this.handleError));
  }

  liveApiGetCall(endURL: string): Observable<any> {
    let finalURL = endURL;
    return this.http.get<any>(finalURL).pipe(catchError(this.handleError));
  }

  getPaymentData(codeNumber: string, year: string, division: string): Observable<any> {
    const params = new HttpParams()
      .set('codeNumber', codeNumber)
      .set('year', year)
      .set('division', division);

    return this.http.get<any>(`${API_URL}api/payment/getData`, { params });
  }

  updateJvNo(division: string, jvStatus: string): Observable<any> {
    const params = new HttpParams()
      .set('division', division)
      .set('jvStatus', jvStatus);

    return this.http.post(`${API_URL}api/autoGenerate/jvNumber/Status`, {}, { params: params });
  }

  getJvNumber(division: string): Observable<any> {
    // Set the request parameters
    const params = new HttpParams().set('division', division);

    // Make the POST request with params in the options object
    return this.http.post<any>(`${API_URL}api/autoGenerate/jvNumber`, {}, { params });
  }

  updateBillNo(newBillNo: string, division: string, responseStatus: string): Observable<any> {
    const params = new HttpParams()
      .set('newBillNo', newBillNo)
      .set('division', division)
      .set('responseStatus', responseStatus);

    return this.http.post(`${API_URL}api/payment/updateBillNo`, {}, { params: params });
  }

  getJournalById(id: number): Observable<any> {
    const url = `${API_URL}api/journal/getById/${id}`;
    return this.http.post(url, {});
  }

  getReceiptById(receiptId: string): Observable<any> {
    return this.http.get(`${API_URL}api/receipts/getByReceiptNo/${receiptId}`);
  }

  apiGetCall_receipt(endURL: string, params: { pageNo: number; pageSize: number; division: string; search?: string }): Observable<any> {
    const finalURL = API_URL + endURL;

    let httpParams = new HttpParams()
      .set('pageNo', params.pageNo.toString())
      .set('pageSize', params.pageSize.toString())
      .set('division', params.division);

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<any>(finalURL, { params: httpParams }).pipe(
      catchError(this.handleError)
    );
  }






  private handleError(error: HttpErrorResponse) {
    let errorMessage: string =
      'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `${error}`;
    }

    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }

  throwError(errorMessage: string) {
    throw new Error('This' + errorMessage + 'is not implemented');
  }
}

// export class ApiservicesService {
//   private token: string | null = null;

//   constructor(private http: HttpClient) {}

//   setToken(token: string): void {
//     this.token = token;
//   }

//   private getHeaders(): HttpHeaders {
//     let headers = new HttpHeaders();
//     if (this.token) {
//       headers = headers.set('Authorization', `Bearer ${this.token}`);
//     }
//     return headers;
//   }

//   apiPostCall(endURL: string, postPara: any): Observable<any> {
//     let finalURL = API_URL + endURL;
//     return this.http.post<any>(finalURL, postPara, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   apiPostCall_Query(endURL: string, params: { [key: string]: string }): Observable<any> {
//     let finalURL = API_URL + endURL;
//     let httpParams = new HttpParams();

//     for (const key in params) {
//       if (params.hasOwnProperty(key)) {
//         httpParams = httpParams.set(key, params[key]);
//       }
//     }

//     return this.http.post(finalURL, {}, { headers: this.getHeaders(), params: httpParams })
//       .pipe(catchError(this.handleError));
//   }

//   apiPostCall_beRbe(endURL: string, params: { [key: string]: string }): Observable<any> {
//     let finalURL = API_URL + endURL;
//     let httpParams = new HttpParams();

//     for (const key in params) {
//       if (params.hasOwnProperty(key)) {
//         httpParams = httpParams.set(key, params[key]);
//       }
//     }

//     return this.http.post(finalURL, {}, { headers: this.getHeaders(), params: httpParams })
//       .pipe(catchError(this.handleError));
//   }

//   apiGetCall(endURL: string): Observable<any> {
//     let finalURL = API_URL + endURL;
//     return this.http.get<any>(finalURL, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   apiPutCall(endURL: string, putPara: any): Observable<any> {
//     let finalURL = API_URL + endURL;
//     return this.http.put<any>(finalURL, putPara, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   apiDeleteCall(endURL: string, id: any): Observable<any> {
//     let finalURL = API_URL + endURL + id;
//     return this.http.delete<any>(finalURL, { headers: this.getHeaders() })
//       .pipe(catchError(this.handleError));
//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage: string = 'Something bad happened; please try again later.';

//     if (error.error instanceof ErrorEvent) {
//       errorMessage = error.error.message;
//     } else {
//       errorMessage = `${error}`;
//     }

//     return throwError(errorMessage);
//   }
// }
