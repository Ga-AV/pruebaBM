import { Time } from "@angular/common";

export interface Vehiculos {
    id:number;
    placa:string;
    entrada: Date;
    salida:Date;
    total:number;
    tipo:string;
    pago:number;
}
