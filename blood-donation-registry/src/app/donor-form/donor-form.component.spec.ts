import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorFormComponent } from '../helpers/helpers';

describe('DonorFormComponent', () => {
  let component: DonorFormComponent;
  let fixture: ComponentFixture<DonorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
