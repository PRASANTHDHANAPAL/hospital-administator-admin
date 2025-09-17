

export interface ConsultationsDto {
    id: number,
    doctorId: number,
    day: string,
    sessionType: string,
    startTime: string,
    endTime: string
}

export interface DoctorsDto {
    doc_id: number,
    docname?:string;
    

dob?:string;


address?:string;


education?:string;

specalist?:string;
    

docemailId?:string;


docpassword?:string;

photo?:string;

phonenumber?:string;
    consultations:ConsultationsDto[]
}