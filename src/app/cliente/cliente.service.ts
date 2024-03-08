import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteURL: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.clienteURL = `${environment.apiURl}/cliente`
  }

  listar() {
    return this.http.get<Array<Cliente>>(this.clienteURL);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.clienteURL}/${id}`);
  }

  getIncluir(request: Cliente) {
    return this.http.post<Cliente>(`${this.clienteURL}/cadastro`, request);
  }

  getAlterar(id: Number | null, request: Cliente) {
    return this.http.put<Cliente>(`${this.clienteURL}/${id}`, request);
  }

  getExcluir(id: Number) {
    return this.http.delete<Cliente>(`${this.clienteURL}/${id}`);
  }
}
