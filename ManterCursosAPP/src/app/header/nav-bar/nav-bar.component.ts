import { Component, OnInit } from '@angular/core';
import { LoginModelService } from 'src/app/shared/login.model.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  mostrarMenu: boolean = false;

  constructor(public usuario: LoginModelService) { }

  ngOnInit(): void {
    this.usuario.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }


}
