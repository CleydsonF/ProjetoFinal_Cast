import { CadastroCursosService } from 'src/app/shared/cadastro-cursos.service';
import { Component, OnInit } from '@angular/core';
import { LoginModelService } from 'src/app/shared/login.model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public aqui: string = "";

  constructor(public login: LoginModelService, public usuario: CadastroCursosService, private router: Router) { }

  ngOnInit(): void {
  }

  exibirValores(email: string){
    this.aqui = email;
    alert(this.aqui)
  }

}
