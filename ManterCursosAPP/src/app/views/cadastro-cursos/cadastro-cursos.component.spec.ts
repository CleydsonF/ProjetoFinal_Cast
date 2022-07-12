import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCursosComponent } from './cadastro-cursos.component';

describe('CadastroCursosComponent', () => {
  let component: CadastroCursosComponent;
  let fixture: ComponentFixture<CadastroCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
