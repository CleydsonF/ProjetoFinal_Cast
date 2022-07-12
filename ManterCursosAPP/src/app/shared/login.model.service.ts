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

   /* this.usuario.listUsuario.find(u => {
     if(u.nomeUsuario){
       alert("wqeqw")
      }
       else{
         alert("dskfk")
       }

   }) */

   /* this.usuario.listUsuario?.forEach(c => {
      if(c.nomeUsuario == "admin" && c.senha == "123"){
        this.adminAutenticado = c;
        alert("Logado")
      }
    });
    if(this.adminAutenticado != null){
      localStorage.setItem('adminAutenticado',JSON.stringify(this.adminAutenticado))
    }else{
      console.log("usuario "+ this.usuario.formDataUsuario.email +" senha: " + this.usuario.formDataUsuario.senha)
      alert("Deu Erro")
    } */

    /* if(this.usuario.listUsuario.some(u => u.nomeUsuario == "admin")){
        this.toastr.success("Logado")
    }
    else
    {
      this.toastr.error("nao é igual")
    } */
}



}
