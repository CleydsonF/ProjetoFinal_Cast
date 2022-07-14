import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste-home',
  templateUrl: './teste-home.component.html',
  styleUrls: ['./teste-home.component.css']
})
export class TesteHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  app(){
    this.router.navigate(['/cursos'])
  }

}
