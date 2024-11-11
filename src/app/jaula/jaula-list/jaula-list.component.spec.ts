import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaListComponent } from './jaula-list.component';

describe('JaulaListComponent', () => {
  let component: JaulaListComponent;
  let fixture: ComponentFixture<JaulaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
