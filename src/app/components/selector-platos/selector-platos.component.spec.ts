import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPlatosComponent } from './selector-platos.component';

describe('SelectorPlatosComponent', () => {
  let component: SelectorPlatosComponent;
  let fixture: ComponentFixture<SelectorPlatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorPlatosComponent]
    });
    fixture = TestBed.createComponent(SelectorPlatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
