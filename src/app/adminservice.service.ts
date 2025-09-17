import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { AdminsDTO } from './admin/admindto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public sendAdminData(data: AdminsDTO[]) {
    this.AdminData.next(data);
  }

  private AdminData: BehaviorSubject<AdminsDTO[]> = new BehaviorSubject<
    AdminsDTO[]
  >([]);
  private AdminData$: Observable<AdminsDTO[]> = this.AdminData.asObservable();

  constructor(private http: HttpClient) {}

  onedit(id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/admin/${id}`);
  }

  getAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/admin`);
  }

  public getAdminrData() {
    return this.AdminData$;
  }

  getAdminById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/${id}`);
  }

  updateAdmin(id: number, admins: any): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/admin/${id}`, admins);
  }
  createAdmin(adminData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}}`, adminData);
  }

  public searchAdminEmail(AdminEmailSearch: string) {
    let url = `${environment.apiBaseUrl}/admin`;

    if (AdminEmailSearch && AdminEmailSearch.length > 0) {
      url += `?AdminEmailSearch=${AdminEmailSearch}`;
    }

    this.http
      .get<AdminsDTO[]>(url)
      .subscribe((apiResponseData: AdminsDTO[]) => {
        console.log('Response from server:', apiResponseData);
        this.sendAdminData(apiResponseData);

        console.log('request send sucessfilly');
      });
  }

  public searchAdminPhone(phoneSearch: string) {
    let url = `${environment.apiBaseUrl}/admin`;

    if (phoneSearch && phoneSearch.length > 0) {
      url += `?phoneSearch=${phoneSearch}`;
    }

    this.http
      .get<AdminsDTO[]>(url)
      .subscribe((apiResponseData: AdminsDTO[]) => {
        this.sendAdminData(apiResponseData);

        console.log('request send sucessfilly');
      });
  }
  public seachAdminName(AdminNameSearch: string) {
    let url = `${environment.apiBaseUrl}/admin`;

    if (AdminNameSearch && AdminNameSearch.length > 0) {
      url += `?AdminNameSearch=${AdminNameSearch}`;
    }

    this.http
      .get<AdminsDTO[]>(url)
      .subscribe((apiResponseData: AdminsDTO[]) => {
        this.sendAdminData(apiResponseData);

        console.log('request send sucessfilly');
      });
  }

  signIn(Email: string, password: string): Observable<any> {
    let url = `${environment.apiBaseUrl}/auth/adminsignin`;
    let data = {
      admin_emailId: Email,
      admin_password: password,
    };
    return this.http.post<any>(url, data);
  }
}
