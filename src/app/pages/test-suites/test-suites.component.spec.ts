import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuitesComponent } from './test-suites.component';

describe('TestSuitesComponent', () => {
  let component: TestSuitesComponent;
  let fixture: ComponentFixture<TestSuitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestSuitesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSuitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
