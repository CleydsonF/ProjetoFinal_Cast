import { TesteHomeComponent } from './teste-home/teste-home.component';
import { LoginComponent } from './views/login/login.component';
import { HeaderComponent } from './header/header/header.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCursosComponent } from './views/cadastro-cursos/cadastro-cursos.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { LogComponent } from './views/log/log.component';
import { LoginFormComponent } from './views/login/login-form/login-form.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'cursos', component: CadastroCursosComponent },
  {path: 'categorias', component: CategoriasComponent },
  {path: 'logs', component: LogComponent},
  {path: 'home', component: HomeComponent},
  {path: 'app', component: HeaderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home-test', component: TesteHomeComponent},
  {path: 'cadastro', component: LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
