import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PauseIndicatorComponent } from './pause-indicator.component';

describe('PauseIndicatorComponent', () => {
  let component: PauseIndicatorComponent;
  let fixture: ComponentFixture<PauseIndicatorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PauseIndicatorComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
