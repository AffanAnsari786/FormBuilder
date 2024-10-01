import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsavedComponent } from './previewsaved.component';

describe('PreviewsavedComponent', () => {
  let component: PreviewsavedComponent;
  let fixture: ComponentFixture<PreviewsavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewsavedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewsavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
