import { Log } from './../../shared/logs.model';
import { CadastroCursosService } from 'src/app/shared/cadastro-cursos.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/shared/usuario.model';
import { Curso } from 'src/app/shared/cadatro-curso.model';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  public excluir!: number;

  constructor(public log: CadastroCursosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.log.refreshList();
  }

  populateForm(selectedRecord: Log) {
    this.log.formDataLog = Object.assign({}, selectedRecord);
  }


  getUsuario(idUsuario: number): Usuario{
    return this.log.listUsuario.find(usu => usu.usuarioID == idUsuario)!;
  }

  getCurso(idCurso: number): Curso {
    return this.log.list.find(curso => curso.cursoID == idCurso)!;
  }

  ValidarExclusao(cursoID: number){
    this.excluir = cursoID;
  }

  Delete(logID: number) {
    this.log.deleteLog(logID).subscribe({
      next:(res) => {
        this.log.refreshList();
        this.toastr.error("Curso deletado com Sucesso", 'Excluido');
      },
      error: err => { console.log(err) }
    })
  }
}
