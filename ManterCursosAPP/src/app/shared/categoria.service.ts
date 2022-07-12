import { Categoria } from './categoria.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  readonly baseURL = 'https://localhost:44373/api/Categorias';
  formData: Categoria = new Categoria();
  list : Categoria[];

  constructor(private http: HttpClient) { }

  postCategoria() {
    return this.http.post(this.baseURL, this.formData);
  }

  putCategoria() {
    return this.http.put(`${this.baseURL}/${this.formData.categoriaID}`, this.formData);
  }

  deleteCategoria(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList() {
    this.http.get(this.baseURL).toPromise().then(res => this.list = res as Categoria[])
  }

  getQuarto(id: number){
    return this.http.get(`${this.baseURL}/${id}`)
  }
}
