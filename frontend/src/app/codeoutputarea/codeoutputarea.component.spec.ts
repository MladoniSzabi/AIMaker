import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeoutputareaComponent } from './codeoutputarea.component';

describe('CodeoutputareaComponent', () => {
  let component: CodeoutputareaComponent;
  let fixture: ComponentFixture<CodeoutputareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeoutputareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeoutputareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
