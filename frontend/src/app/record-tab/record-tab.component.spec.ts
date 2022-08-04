import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTabComponent } from './record-tab.component';

describe('RecordTabComponent', () => {
  let component: RecordTabComponent;
  let fixture: ComponentFixture<RecordTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
