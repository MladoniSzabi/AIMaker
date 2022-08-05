import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenusComponent } from './top-menus.component';

describe('TopMenusComponent', () => {
  let component: TopMenusComponent;
  let fixture: ComponentFixture<TopMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
