import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteHomeComponent } from './teste-home.component';

describe('TesteHomeComponent', () => {
  let component: TesteHomeComponent;
  let fixture: ComponentFixture<TesteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesteHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
