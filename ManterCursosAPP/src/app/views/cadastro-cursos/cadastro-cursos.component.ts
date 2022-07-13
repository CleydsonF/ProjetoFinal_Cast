import { LoginModelService } from 'src/app/shared/login.model.service';
import { Usuario } from 'src/app/shared/usuario.model';
import { Curso } from './../../shared/cadatro-curso.model';
import { Log } from './../../shared/logs.model';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../../shared/categoria.model';
import { Component, OnInit } from '@angular/core';
import { CadastroCursosService } from '../../shared/cadastro-cursos.service';
import { CategoriaService } from '../../shared/categoria.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cadastro-cursos',
  templateUrl: './cadastro-cursos.component.html',
  styleUrls: ['./cadastro-cursos.component.css']
})

export class CadastroCursosComponent implements OnInit {

 descricao: string = '';
 datainicio: string = '';
 dataTermino: string = '';
 quantidadeAlunos: number = 0;
 cat: number = 0;
 nomeCate: any = '';
 excluir!: number;
 dataAtual = new Date().toISOString();
 dataCerta = this.dataAtual.split('T');


  /* Filtros */
 date: string = '';
 dataFiltroInicio: string = '';
 dataFiltroTerminio: string = '';
 filtrosPorDatas: string = '';

  /* Form Log */
 dataInclusao: string = '';
 acao: string = '';
 usuario: string = '';

  mostrarMenu: boolean = false;

  constructor(public login: LoginModelService, public curso: CadastroCursosService, public categoria: CategoriaService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.curso.refreshList();
    this.categoria.refreshList();

    this.login.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

  validacaoFormulario(form: NgForm, dtaIni: Date, dtaTer: Date, descr: string, cate: number, qtd: number)
  {

    //Insert e Update
    if(this.curso.formData.descricaoCurso == "" || this.curso.formData.dataInicio == null || this.curso.formData.datatermino == null || this.curso.formData.categoriaID == 0)
    {
      this.toastr.error("Por favor Preencha todos os campos Obrigatórios!!!")
    } else
    {
      if (this.curso.formData.dataInicio.toString() < this.dataCerta[0].toString() || this.curso.formData.datatermino.toString() < this.dataCerta[0].toString()) {
        this.toastr.error("A DATA DE INICIO não pode ser menor que a data atual!!!");
      } else{
        if(this.curso.list.some(c => (c.descricaoCurso == descr) ))
        {
          this.toastr.error("Curso já cadastrado!!");
        }else
        {
          if (this.curso.formData.datatermino.toString() < this.curso.formData.dataInicio.toString()) {
            this.toastr.error("A DATA DE TERMINO não pode ser menor que a DATA DE INICIO!!!");
          }
          else{
            this.onSubmitt(form);
          }
        }
      }
    }
  }

  populateForm(selectedRecord: Curso) {
    this.curso.formData = Object.assign({}, selectedRecord);
  }

  populateFormCate(selectedRecord: Categoria) {
    this.categoria.formData = Object.assign({}, selectedRecord);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.curso.formData = new Curso();
  }

  onSubmitt(form: NgForm) {

    if (this.curso.list.find(q => q.cursoID == this.curso.formData.cursoID)!)

      this.updateRecord(form);

    else
      this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.curso.postCurso().subscribe(
      res => {
        this.resetForm(form);
        this.curso.refreshList();
        this.toastr.success('Cadastro Feito com Sucesso', 'Registro de Cursos')
      },
      err => {
        console.log(err);
        this.toastr.error("Existe(m) curso(s) planejados(s) dentro do período informado.");
      }
    );
  }

  updateRecord(form: NgForm) {
    this.curso.putCurso().subscribe(
      res => {
        this.resetForm(form);
        this.curso.refreshList();
        this.toastr.success('Atualização Feita com Sucesso', 'Registro de Cursos')
      },
      err => { console.log(err); }
    );
  }


  getCategoria(idCategoria: number): Categoria{
    return this.categoria.list.find(cat => cat.categoriaID == idCategoria)!;
  }

  pegarValores(de: string, di: string, dt: string, qua: number, c: number){
    this.descricao = de;
    this.datainicio = di;
    this.dataTermino = dt;
    this.quantidadeAlunos = qua;
    this.cat = c;
    this.nomeCate = this.getCategoria(this.cat).nome;
  }

  ValidarExclusao(cursoID: number){
    this.excluir = cursoID;
  }

  Delete(cursoID: number) {
       this.curso.deleteCurso(cursoID).subscribe({
      next:(res) => {
        this.curso.refreshList();
        this.toastr.error("Curso deletado com Sucesso", 'Excluido');
      },
      error: err => { console.log(err) }
    })
  }


}

// if(this.curso.formData.datatermino.toString() <= this.dataCerta[0].toString()){
//   this.toastr.error("Este curso já foi realizado, ou está em andamento, portanto não pode ser excluído!!!");
// }
