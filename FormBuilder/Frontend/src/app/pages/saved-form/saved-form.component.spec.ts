import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFormComponent } from './saved-form.component';

describe('SavedFormComponent', () => {
  let component: SavedFormComponent;
  let fixture: ComponentFixture<SavedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
