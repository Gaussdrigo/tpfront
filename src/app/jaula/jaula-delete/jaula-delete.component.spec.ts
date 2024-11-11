import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaDeleteComponent } from './jaula-delete.component';

describe('JaulaDeleteComponent', () => {
  let component: JaulaDeleteComponent;
  let fixture: ComponentFixture<JaulaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulaDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
