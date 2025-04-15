import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHistoryListComponent } from './match-history-list.component';

describe('MatchHistoryListComponent', () => {
  let component: MatchHistoryListComponent;
  let fixture: ComponentFixture<MatchHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchHistoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
