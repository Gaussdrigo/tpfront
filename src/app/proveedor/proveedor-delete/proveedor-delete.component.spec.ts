import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDeleteComponent } from './proveedor-delete.component';

describe('ProveedorDeleteComponent', () => {
  let component: ProveedorDeleteComponent;
  let fixture: ComponentFixture<ProveedorDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
