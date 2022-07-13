import { CadastroCursosService } from 'src/app/shared/cadastro-cursos.service';
import { EventEmitter, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginModelService {

  mostrarMenuEmitter = new EventEmitter<boolean>()

  mostrar: boolean = false;

  constructor(public usuario: CadastroCursosService,  private toastr: ToastrService, private router: Router) { }

  verificarUsuario(){
    alert(this.usuario.formDataUsuario.email + " " + this.usuario.formDataUsuario.senha)

    if (this.usuario.formDataUsuario.email == "admin") {
      alert("Logado")
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/cursos'])
    }

}



}
