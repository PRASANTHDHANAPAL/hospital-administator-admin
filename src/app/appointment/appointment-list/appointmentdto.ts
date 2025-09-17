
export interface AppointmentDto {
    doctor: any;
    docname:string;
    id?:number;
   
    date?:string;
   
    consultaion:{ day:string;
        session:string;
        start_time:string;
    doctor:{docname:string;
        education:string
    };
    };
   
    user:{ name:string; };
}
export interface Consultation {
    con_id: number;
    day: string;
    session: string;
    start_time: string;
    end_time: string;
  }