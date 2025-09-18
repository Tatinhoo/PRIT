import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicoCreatePage } from './servico-create.page';

describe('ServicoCreatePage', () => {
  let component: ServicoCreatePage;
  let fixture: ComponentFixture<ServicoCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
