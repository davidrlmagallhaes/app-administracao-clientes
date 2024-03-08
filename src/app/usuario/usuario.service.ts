import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsersFromJson(): Observable<any> {
    return this.http.get<any>('assets/usuarios.json');
  }

  getUserByEmail(email: string, senha: string): Observable<any> {
    return this.getUsersFromJson().pipe(
      map((usuarios: any[]) => {
        return usuarios.find(usuario => usuario.email === email && atob(usuario.senha) === senha);
      })
    );
  }
}
