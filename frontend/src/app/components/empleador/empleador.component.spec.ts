import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadorComponent } from './empleador.component';

describe('EmpleadorComponent', () => {
  let component: EmpleadorComponent;
  let fixture: ComponentFixture<EmpleadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
