import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOrDividerComponent } from './auth-or-divider.component';

describe('AuthOrDividerComponent', () => {
  let component: AuthOrDividerComponent;
  let fixture: ComponentFixture<AuthOrDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthOrDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthOrDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
