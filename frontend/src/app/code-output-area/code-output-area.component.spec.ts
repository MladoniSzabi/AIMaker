import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOutputAreaComponent } from './code-output-area.component';

describe('CodeoutputareaComponent', () => {
  let component: CodeOutputAreaComponent;
  let fixture: ComponentFixture<CodeOutputAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeOutputAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeOutputAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
