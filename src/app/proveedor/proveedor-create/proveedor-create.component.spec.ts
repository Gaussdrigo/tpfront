/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProveedorCreateComponent } from './proveedor-create.component';
import { ProveedorService } from './proveedor.service'; // Ajusta la ruta según tu estructura de proyecto

describe('ProveedorCreateComponent', () => {
  let component: ProveedorCreateComponent;
  let fixture: ComponentFixture<ProveedorCreateComponent>;
  let proveedorService: ProveedorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ProveedorCreateComponent
      ],
      providers: [ProveedorService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorCreateComponent);
    component = fixture.componentInstance;
    proveedorService = TestBed.inject(ProveedorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.proveedorForm.valid).toBeFalsy();
    expect(component.proveedorForm.get('nombre')?.value).toBe('');
  });

  it('should require the nombre field', () => {
    const nombre = component.proveedorForm.get('nombre');
    nombre?.setValue('');
    expect(nombre?.valid).toBeFalsy();
    expect(nombre?.errors?.required).toBeTruthy();
  });

  it('should require the nombre field to have at least 3 characters', () => {
    const nombre = component.proveedorForm.get('nombre');
    nombre?.setValue('ab');
    expect(nombre?.valid).toBeFalsy();
    expect(nombre?.errors?.minlength).toBeTruthy();
  });

  it('should call proveedorService.addProveedor on form submit', () => {
    spyOn(proveedorService, 'addProveedor').and.returnValue(of({}));
    component.proveedorForm.setValue({ nombre: 'Proveedor Test' });
    component.onSubmit();
    expect(proveedorService.addProveedor).toHaveBeenCalledWith({ nombre: 'Proveedor Test' });
  });
}); */
