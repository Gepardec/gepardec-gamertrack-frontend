import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEditFormComponent } from './game-edit-form.component';

describe('GameEditFormComponent', () => {
  let component: GameEditFormComponent;
  let fixture: ComponentFixture<GameEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
