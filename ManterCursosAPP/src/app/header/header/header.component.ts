import { Component, OnInit } from '@angular/core';
import { CadastroCursosService } from 'src/app/shared/cadastro-cursos.service';
import { CadastroCursosComponent } from 'src/app/views/cadastro-cursos/cadastro-cursos.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public curso: CadastroCursosService) { }

  ngOnInit(): void {
  }


}
