import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DoctorsDto } from './doctor/doctordto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}
  uploadDoctorPhoto(doc_id: number, formData: FormData): Observable<any> {
    const uploadUrl = `${environment.apiBaseUrl}/upload-images/image/${doc_id}`;
    return this.http.post<any>(uploadUrl, formData);
  }

  ConsultationofDoctor(doc_id: any) {
    throw new Error('Method not implemented.');
  }

  adduser(id: number) {}

  private baseUrl = '';
  createDoctor(doctorData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/doctor`, doctorData);
  }
  oneditdoctor(doc_id: any) {
    return this.http.get<any>(`${environment.apiBaseUrl}/doctor/${doc_id}`);
  }

  private doctorData: BehaviorSubject<DoctorsDto[]> = new BehaviorSubject<
    DoctorsDto[]
  >([]);
  private doctorData$: Observable<DoctorsDto[]> =
    this.doctorData.asObservable();

  public sendDoctorData(data: DoctorsDto[]) {
    this.doctorData.next(data);
  }

  public searchDoctor(searchText: string) {
    let url = `${environment.apiBaseUrl}/doctor`;

    if (searchText && searchText.length > 0) {
      url += `?searchText=${searchText}`;
    }

    this.http
      .get<DoctorsDto[]>(url)
      .subscribe((apiResponseData: DoctorsDto[]) => {
        this.sendDoctorData(apiResponseData);
      });
  }

  public getDoctorData() {
    return this.doctorData$;
  }

  upadtedoctor(id: number, doctor: any): Observable<any> {
    console.log(id);
    return this.http.patch(`${environment.apiBaseUrl}/doctor/${id}`, doctor);
  }

  selectDoctor(doc_id: number) {
    return this.http.get(`${environment.apiBaseUrl}/doctor/${doc_id}`);
  }
  getDoctors() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/doctor`);
  }

  public searchDoctorname(docnamesearch: string) {
    let url = `${environment.apiBaseUrl}/doctor`;

    if (docnamesearch && docnamesearch.length > 0) {
      url += `?docnamesearch=${docnamesearch}`;
    }

    this.http
      .get<DoctorsDto[]>(url)
      .subscribe((apiResponseData: DoctorsDto[]) => {
        this.sendDoctorData(apiResponseData);
        console.log('request send sucessfilly');
      });
  }

  public searchDoctorspecialist(specalist: string) {
    let url = `${environment.apiBaseUrl}/doctor`;

    if (specalist && specalist.length > 0) {
      url += `?specalist=${specalist}`;
    }

    this.http
      .get<DoctorsDto[]>(url)
      .subscribe((apiResponseData: DoctorsDto[]) => {
        this.sendDoctorData(apiResponseData);
      });
  }

  getdocotorConsultations(doc_id: any) {
    return this.http.get(`${environment.apiBaseUrl}/doctor/${doc_id}`);
  }
}
