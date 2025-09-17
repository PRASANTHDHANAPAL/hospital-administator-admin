import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AppointmentDto,
  Consultation,
} from './appointment/appointment-list/appointmentdto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}
  getAppointment(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/appoinment`);
  }
  oneditappointment(id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/appoinment/${id}`);
  }

  private appointmentData: BehaviorSubject<AppointmentDto[]> =
    new BehaviorSubject<AppointmentDto[]>([]);

  private appointmentData$: Observable<AppointmentDto[]> =
    this.appointmentData.asObservable();

  public sendDoctorData(data: AppointmentDto[]) {
    this.appointmentData.next(data);
  }

  public getAppointments() {
    return this.appointmentData$;
  }

  public searchAppointments(searchText: string) {
    let url = `${environment.apiBaseUrl}/appoinment`;

    if (searchText && searchText.length > 0) {
      url += `?searchText=${searchText}`;
    }

    this.http
      .get<AppointmentDto[]>(url)
      .subscribe((apiResponseData: AppointmentDto[]) => {
        this.sendDoctorData(apiResponseData);
      });
  }

  createAppointment(formData: any) {
    return this.http.post(`${environment.apiBaseUrl}/appoinment`, formData);
  }

  upadteappointment(id: number, appoinment: any) {
    return this.http.patch(
      `${environment.apiBaseUrl}/appoinment/${id}`,
      appoinment
    );
  }
  DoctorSearch(AppointmentDoctorSearch: string) {
    let url = `${environment.apiBaseUrl}/appoinment`;

    if (AppointmentDoctorSearch && AppointmentDoctorSearch.length > 0) {
      url += `?AppointmentDoctorSearch=${AppointmentDoctorSearch}`;
    }
    console.log('request send sucessfully');
    this.http
      .get<AppointmentDto[]>(url)
      .subscribe((apiResponseData: AppointmentDto[]) => {
        this.sendDoctorData(apiResponseData);
      });
  }

  PatientNameSearch(AppointmentNameSearch: string) {
    let url = `${environment.apiBaseUrl}/appoinment`;

    if (AppointmentNameSearch && AppointmentNameSearch.length > 0) {
      url += `?AppointmentNameSearch=${AppointmentNameSearch}`;
    }
    console.log('request send sucessfully');
    this.http
      .get<AppointmentDto[]>(url)
      .subscribe((apiResponseData: AppointmentDto[]) => {
        this.sendDoctorData(apiResponseData);
      });
  }

  Appointmentdatesearch(AppointmentDateSearch: any) {
    let url = `${environment.apiBaseUrl}/appoinment`;

    if (AppointmentDateSearch && AppointmentDateSearch.length > 0) {
      url += `?AppointmentDateSearch=${AppointmentDateSearch}`;
    }
    console.log('request send sucessfully');
    this.http
      .get<AppointmentDto[]>(url)
      .subscribe((apiResponseData: AppointmentDto[]) => {
        this.sendDoctorData(apiResponseData);
      });
  }
  onSeletectedSubscriber(id: any) {
    return this.http.get(`${environment.apiBaseUrl}/user/${id}`);
  }
  private selectedSubscriber: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public selectedSubscriber$: Observable<any> =
    this.selectedSubscriber.asObservable();
  setSelectedSubscriber(user: any) {
    this.selectedSubscriber.next(user);
  }

  conUrl = `${environment.apiBaseUrl}/doctor`;
  getDayConsultation(doc_id: number, dayOfWeek: string): Observable<any> {
    const url = `${this.conUrl}/${doc_id}/consultations/${dayOfWeek}`;
    return this.http.get(url);
  }

  sendSessionToBackend(doc_id: number, dayOfWeek: string, session: string) {
    const url = `${this.conUrl}/${doc_id}/consultations/${dayOfWeek}/${session}`;
    return this.http.get<Consultation[]>(url);
  }
  appoinmentdoctor(doc_id: any) {
    return this.http.get<any>(`${environment.apiBaseUrl}/doctor/${doc_id}`);
  }
}
