import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCarouselComponent } from './logo-carousel.component';

describe('LogoCarouselComponent', () => {
  let component: LogoCarouselComponent;
  let fixture: ComponentFixture<LogoCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoCarouselComponent]
    });
    fixture = TestBed.createComponent(LogoCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
