import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDTO } from './user/userdto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  onedituser(id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/user/${id}`);
  }

  public senduserData(data: UserDTO[]) {
    this.UserData.next(data);
  }

  public searchuser(searchText: string) {
    let url = `${environment.apiBaseUrl}/user`;

    if (searchText && searchText.length > 0) {
      url += `?searchText=${searchText}`;
    }

    this.http.get<UserDTO[]>(url).subscribe((apiResponseData: UserDTO[]) => {
      this.senduserData(apiResponseData);
    });
  }

  private UserData: BehaviorSubject<UserDTO[]> = new BehaviorSubject<UserDTO[]>(
    []
  );
  private UserData$: Observable<UserDTO[]> = this.UserData.asObservable();

  public getUserData() {
    return this.UserData$;
  }

  updateuser(id: number, user: any): Observable<any> {
    return this.http.patch(`${environment.apiBaseUrl}/user/${id}`, user);
  }

  public searchuseremail(UserEmailSearch: string) {
    let url = `${environment.apiBaseUrl}/user`;

    if (UserEmailSearch && UserEmailSearch.length > 0) {
      url += `?UserEmailSearch=${UserEmailSearch}`;
    }
    console.log('request send sucessfully');
    this.http.get<UserDTO[]>(url).subscribe((apiResponseData: UserDTO[]) => {
      this.senduserData(apiResponseData);
    });
  }
  public SearchUserPhone(UsearchPhoneSearch: string) {
    let url = `${environment.apiBaseUrl}/user`;

    if (UsearchPhoneSearch && UsearchPhoneSearch.length > 0) {
      url += `?UsearchPhoneSearch=${UsearchPhoneSearch}`;
    }
    console.log('request send sucessfully');
    this.http.get<UserDTO[]>(url).subscribe((apiResponseData: UserDTO[]) => {
      this.senduserData(apiResponseData);
    });
  }
  public SearchUserName(UserNameSearch: string) {
    let url = `${environment.apiBaseUrl}/user`;

    if (UserNameSearch && UserNameSearch.length > 0) {
      url += `?UserNameSearch=${UserNameSearch}`;
    }
    console.log('request send sucessfully');
    this.http.get<UserDTO[]>(url).subscribe((apiResponseData: UserDTO[]) => {
      this.senduserData(apiResponseData);
    });
  }
  private baseUrl = `${environment.apiBaseUrl}/user`;
  createUser(formData: string): Observable<any> {
    console.log('created sucessfully');
    return this.http.post(`${this.baseUrl}`, formData);
  }
  getusers() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/user`);
  }
}
