import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { CadastroCursosComponent } from './views/cadastro-cursos/cadastro-cursos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { LogComponent } from './views/log/log.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './views/login/login.component';
import { TesteHomeComponent } from './teste-home/teste-home.component';
import { AquiComponent } from './header/aqui/aqui.component';
import { LoginFormComponent } from './views/login/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    HomeComponent,
    CadastroCursosComponent,
    CategoriasComponent,
    LogComponent,
    LoginComponent,
    TesteHomeComponent,
    AquiComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
