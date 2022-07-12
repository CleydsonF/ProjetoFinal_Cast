import { Usuario } from './../../../shared/usuario.model';
import { CadastroCursosService } from './../../../shared/cadastro-cursos.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public usuario: CadastroCursosService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.usuario.refreshList();
  }

  onSubmit(form: NgForm){
    if (this.usuario.listUsuario.find(u => u.usuarioID == this.usuario.formDataUsuario.usuarioID))
      this.updateRecord(form);
    else
      this.insertRecord(form);
      this.router.navigate(['/login'])
  }

  insertRecord(form: NgForm) {
    this.usuario.postUsuario().subscribe(
      res => {
        this.resetForm(form);
        this.usuario.refreshList();
        this.toastr.success('Cadastro Feito com Sucesso', 'Registro de Categoria')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.usuario.putUsuario().subscribe(
      res => {
        this.resetForm(form);
        this.usuario.refreshList();
        this.toastr.success('Atualização Feita com Sucesso', 'Registro de Categoria')
      },
      err => { console.log(err); }
    );
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.usuario.deleteUsuario(id)
        .subscribe(
          res => {
            this.usuario.refreshList();
            this.toastr.error("Deletado com Sucesso", 'Registro de Categoria');
          },
          err => { console.log(err) }
        )
    }
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.usuario.formDataUsuario = new Usuario();
  }

}
