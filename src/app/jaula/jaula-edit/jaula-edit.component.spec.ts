import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaEditComponent } from './jaula-edit.component';

describe('JaulaEditComponent', () => {
  let component: JaulaEditComponent;
  let fixture: ComponentFixture<JaulaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
