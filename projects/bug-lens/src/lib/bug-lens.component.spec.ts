import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugLensComponent } from './bug-lens.component';

describe('BugLensComponent', () => {
  let component: BugLensComponent;
  let fixture: ComponentFixture<BugLensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugLensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugLensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
