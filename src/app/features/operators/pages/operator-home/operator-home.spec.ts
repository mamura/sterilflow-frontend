import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperatorHome } from './operator-home';

describe('OperadorHome', () => {
  let component: OperatorHome;
  let fixture: ComponentFixture<OperatorHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorHome],
    }).compileComponents();

    fixture = TestBed.createComponent(OperatorHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
