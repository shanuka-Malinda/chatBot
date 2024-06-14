import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenImgComponent } from './gen-img.component';

describe('GenImgComponent', () => {
  let component: GenImgComponent;
  let fixture: ComponentFixture<GenImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
