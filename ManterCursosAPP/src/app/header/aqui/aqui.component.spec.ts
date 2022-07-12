import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AquiComponent } from './aqui.component';

describe('AquiComponent', () => {
  let component: AquiComponent;
  let fixture: ComponentFixture<AquiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AquiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
