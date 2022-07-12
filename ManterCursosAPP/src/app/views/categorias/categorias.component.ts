import { Categoria } from './../../shared/categoria.model';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/shared/categoria.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public nome: string = "";

  constructor(public categoria: CategoriaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoria.refreshList();
  }

  populateForm(selectedRecord: Categoria) {
    this.categoria.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.categoria.deleteCategoria(id)
        .subscribe(
          res => {
            this.categoria.refreshList();
            this.toastr.error("Deletado com Sucesso", 'Registro de Categoria');
          },
          err => { console.log(err) }
        )
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.categoria.formData = new Categoria();
  }

  onSubmitt(form: NgForm) {
    if (this.categoria.list.find(q => q.categoriaID == this.categoria.formData.categoriaID))
   /*  if(this.categoria.formData.categoriaID == 0) */
   this.updateRecord(form);
   else
   this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.categoria.postCategoria().subscribe(
      res => {
        this.resetForm(form);
        this.categoria.refreshList();
        this.toastr.success('Cadastro Feito com Sucesso', 'Registro de Categoria')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.categoria.putCategoria().subscribe(
      res => {
        this.resetForm(form);
        this.categoria.refreshList();
        this.toastr.success('Atualização Feita com Sucesso', 'Registro de Categoria')
      },
      err => { console.log(err); }
    );
  }

  pegarValores(n: string){
    this.nome = n;
  }
}
