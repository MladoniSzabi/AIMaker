import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroPanelComponent } from './macro-panel.component';

describe('MacroPanelComponent', () => {
  let component: MacroPanelComponent;
  let fixture: ComponentFixture<MacroPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
