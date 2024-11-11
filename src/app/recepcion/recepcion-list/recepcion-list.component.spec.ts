import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionListComponent } from './recepcion-list.component';

describe('RecepcionListComponent', () => {
  let component: RecepcionListComponent;
  let fixture: ComponentFixture<RecepcionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
