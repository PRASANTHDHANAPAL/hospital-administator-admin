import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/doctorservice.service';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss']
})
export class DoctorAddComponent {

  photoUrl: string | ArrayBuffer | null = null;
  formData: any={
    docname:"",
dob:"",
address:"",
education:"",
specalist:"",
docemailId:"",
docpassword:"",
phonenumber:"",
photo:null
  };
  constructor(private router:Router,private DoctorService: DoctorService,private toastr:ToastrService){}
  backtodoctorlist(){
    let url=`mainnav/(mainnav:doctor-list)`;
    this.router.navigateByUrl(url)
  }
  createDoctor(): void {
   



    if (!this.isValidNameLength(this.formData.docname)) {
      this.toastr.error('Please enter your Name.', 'Error', {
          positionClass: 'toast-bottom-center'
      });
      return;
  }

  if (!this.formData.dob) {
      this.toastr.error('Please enter your Dob.', 'Error', {
          positionClass: 'toast-bottom-center'
      });
      return;
  }

  if (!this.isValidAddress(this.formData.address) ){
      this.toastr.error('Please enter your Address.', 'Error', {
          positionClass: 'toast-bottom-center'
      });
      return;
  }

  if (!this.formData.docpassword) {
      this.toastr.error('Please enter your Password.', 'Error', {
          positionClass: 'toast-bottom-center'
      });
      return;
  }
  if (!this.isValidEducation(this.formData.education)) {
    this.toastr.error('Please enter a Valid Education Feild.', 'Error', {
        positionClass: 'toast-bottom-center'
    });
    return;
  }
  if (!this.isValidSpecality(this.formData.specalist)) {
    this.toastr.error('Please enter a valid Specality Value.', 'Error', {
        positionClass: 'toast-bottom-center'
    });
    return;
  }
  if (!this.isValidEmail(this.formData.docemailId)) {
    this.toastr.error('Please enter a valid Gmail address.', 'Error', {
        positionClass: 'toast-bottom-center'
    });
    return;
}



if (!this.isValidPhoneNumber(this.formData.phonenumber)) {
  this.toastr.error('Please enter a valid 10-digit phone number.', 'msg', {
      positionClass: 'toast-bottom-center'
  });
  return;
}

    this.DoctorService.createDoctor(this.formData)
      .subscribe(
        {
       next: response => {
          console.log('Doctor created successfully:', this.formData);
          if (this.formData.photo) {
            this.uploadPhoto(response.doc_id); 
          }
          
          this.formData = {};
          this.toastr.success("Doctor Created Successfully", "Success", {
            positionClass: 'toast-bottom-center'
          });
          let url=`mainnav/(mainnav:consultation-doctor)`;
          this.router.navigateByUrl(url, { state: { doc_id: response.doc_id ,docname:response.docname} })
          console.log(this.formData.doc_id)
        },
        error:error => {
          console.error('Error creating user:', error);
        }}
      );
  }
  uploadPhoto(doc_id: number): void {
    if (!doc_id || isNaN(doc_id)) {
      console.error("Invalid doctor ID for photo upload:", doc_id);
      return;
    }
    const photoFormData = new FormData();

    photoFormData.append('file', this.formData.photo);
    this.DoctorService.uploadDoctorPhoto(doc_id,  photoFormData).subscribe({
      next: (response) => {
        console.log('Photo uploaded successfully:', response);
        // Success toast logic
      },
      error: (error) => {
        console.error('Error uploading photo:', error);
        // Error toast logic
      }
    });
  }
  

  isValidNameLength(docname: string): boolean {

    return docname.length >= 4;
}
isValidSpecality(specalist: string): boolean {

  return specalist.length >= 4;
}
isValidEducation(education: string): boolean {

  return education.length >= 4;
}
  isValidAddress(address:string):boolean{
    return address.length >=5;
  }
isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail.com$/; // Regular expression for Gmail
  return emailRegex.test(email);
}

isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\d{10}$/; // Regular expression to check if the string contains exactly 10 digits
  return phoneRegex.test(phone);
}



// onFileSelected(event: any): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     this.formData.photo = input.files[0];
//     console.log('Selected file:', this.formData.photo); // Log the selected file

//     // Optionally, preview the file
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       if (e.target) {
//         this.photoUrl = e.target.result; // For displaying the selected file preview
//       }
//     };
//     reader.readAsDataURL(this.formData.photo);
//   }
// }
onFileSelected(event: any): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.formData.photo = input.files[0];
    console.log('Selected file:', this.formData.photo);
  }
}

}
