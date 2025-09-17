export interface ConsutationtimeDto {
    con_id:number;
    
    day:string;
   
    doctor:{ doc_id: number,docname:string; };
    session:string;
    consultations:{start_time:string;}
  
    start_time:string;
    end_time:string;
}
export interface  ConsultationData{
    day: string;
    session: string;
    start_time: string;
    end_time: string;
    doc_id: number;
  }