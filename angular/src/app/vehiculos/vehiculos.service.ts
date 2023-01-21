import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Vehiculos } from './vehiculos';

@Injectable({
  providedIn: 'root'
})

export class VehiculosService {
  private apiURL = "http://localhost:8000/api/vehiculos/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Vehiculos[]> {
    return this.httpClient.get<Vehiculos[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getResidentes(): Observable<Vehiculos[]> {
    return this.httpClient.get<Vehiculos[]>(this.apiURL + 'getResidentes/' )
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getOficiales(): Observable<Vehiculos[]> {
    return this.httpClient.get<Vehiculos[]>(this.apiURL + 'getOficiales/' )
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getTipo(placa: string): Observable<Vehiculos> {
    return this.httpClient.get<Vehiculos>(this.apiURL + 'getTipo/' + placa)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  crearVehiculo(vehiculos): Observable<Vehiculos> {
    return this.httpClient.post<Vehiculos>(this.apiURL + 'crearVehiculo', JSON.stringify(vehiculos), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  crearVehiculoOficial(vehiculos): Observable<Vehiculos> {
    return this.httpClient.post<Vehiculos>(this.apiURL + 'crearVehiculoOficial', JSON.stringify(vehiculos), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  crearVehiculoNR(vehiculos): Observable<Vehiculos> {
    return this.httpClient.post<Vehiculos>(this.apiURL + 'crearVehiculoNR', JSON.stringify(vehiculos), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  registrarEntrada(placa): Observable<Vehiculos> {
    return this.httpClient.put<Vehiculos>(this.apiURL + 'registrarEntrada/' + placa, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  registrarSalida(placa): Observable<Vehiculos> {
    return this.httpClient.put<Vehiculos>(this.apiURL + 'registrarSalida/' + placa, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  registrarDatos(placa): Observable<Vehiculos> {
    return this.httpClient.put<Vehiculos>(this.apiURL + 'registrarDatos/' + placa, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getPago(placa: string): Observable<Vehiculos> {
    return this.httpClient.get<Vehiculos>(this.apiURL + 'getPago/' + placa)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  comienzaMes(): Observable<Vehiculos> {
    return this.httpClient.put<Vehiculos>(this.apiURL + 'comienzaMes/', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
