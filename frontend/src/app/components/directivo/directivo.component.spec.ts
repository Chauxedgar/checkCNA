import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivoComponent } from './directivo.component';

describe('DirectivoComponent', () => {
  let component: DirectivoComponent;
  let fixture: ComponentFixture<DirectivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
