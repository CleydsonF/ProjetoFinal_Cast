import { Usuario } from './usuario.model';
import { Curso } from './cadatro-curso.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Log } from './logs.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroCursosService {

  readonly baseURL = 'https://localhost:44373/api/Cursos';
  readonly baseURL2 = 'https://localhost:44373/api/Logs';
  readonly baseURL3 = 'https://localhost:44373/api/Usuarios';
  formData: Curso = new Curso();
  formDataLog: Log = new Log();
  formDataUsuario: Usuario = new Usuario();
  list : Curso[];
  listLog : Log[];
  listUsuario : Usuario[];
  public buscar: string = '';

  constructor(private http: HttpClient) { }

  postCurso() {
    return this.http.post(this.baseURL, this.formData);
  }

  postLog() {
    return this.http.post(this.baseURL2, this.formDataLog);
  }

  postUsuario() {
    return this.http.post(this.baseURL3, this.formDataUsuario);
  }

  putCurso() {
    return this.http.put(`${this.baseURL}/${this.formData.cursoID}`, this.formData);
  }

  putLog() {
    return this.http.put(`${this.baseURL2}/${this.formDataLog.logID}`, this.formDataLog);
  }

  putUsuario() {
    return this.http.put(`${this.baseURL3}/${this.formDataUsuario.usuarioID}`, this.formData);
  }

  deleteCurso(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  deleteLog(id: number) {
    return this.http.delete(`${this.baseURL2}/${id}`);
  }

  deleteUsuario(id: number) {
    return this.http.delete(`${this.baseURL3}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL).toPromise().then(res => this.list = res as Curso[]);
    this.http.get(this.baseURL2).toPromise().then(res => this.listLog = res as Log[]);
    this.http.get(this.baseURL3).toPromise().then(res => this.listUsuario = res as Usuario[]);
  }
}
