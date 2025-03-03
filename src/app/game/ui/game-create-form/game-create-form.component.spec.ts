import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateFormComponent } from './game-create-form.component';

describe('GameCreateFormComponent', () => {
  let component: GameCreateFormComponent;
  let fixture: ComponentFixture<GameCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCreateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
