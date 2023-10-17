import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorTopBarComponent } from './author-top-bar.component';

describe('AuthorTopBarComponent', () => {
  let component: AuthorTopBarComponent;
  let fixture: ComponentFixture<AuthorTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorTopBarComponent]
    });
    fixture = TestBed.createComponent(AuthorTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
