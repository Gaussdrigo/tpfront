import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionSeleccionarJaulaComponent } from './recepcion-seleccionar-jaula.component';

describe('RecepcionSeleccionarJaulaComponent', () => {
  let component: RecepcionSeleccionarJaulaComponent;
  let fixture: ComponentFixture<RecepcionSeleccionarJaulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionSeleccionarJaulaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionSeleccionarJaulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
