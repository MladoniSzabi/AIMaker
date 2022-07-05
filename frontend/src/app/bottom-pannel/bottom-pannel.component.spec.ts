import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPannelComponent } from './bottom-pannel.component';

describe('BottomPannelComponent', () => {
  let component: BottomPannelComponent;
  let fixture: ComponentFixture<BottomPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomPannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
