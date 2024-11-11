import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaCreateComponent } from './jaula-create.component';

describe('JaulaCreateComponent', () => {
  let component: JaulaCreateComponent;
  let fixture: ComponentFixture<JaulaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
