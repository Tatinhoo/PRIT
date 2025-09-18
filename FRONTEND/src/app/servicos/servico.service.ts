import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Servico } from 'src/modelos/servico';
@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private api = 'http://localhost:3000/servicos'; // link da api
  private http = inject(HttpClient);

  constructor() {}

  public obterTodos(){
    return this.http.get<Servico[]>(this.api);    
  }
  public obterPeloId(id: string) {
    return this.http.get<Servico>(`${this.api}/id/${id}`);
  }

  public obterPeloNome(nome: string) {
    return this.http.get<Servico[]>(`${this.api}/nome/${nome}`);
  }
  public obterPeloCPF(cpf: string) {
    return this.http.get<Servico[]>(`${this.api}/cpf/${cpf}`);
  }

  public excluir(id: number) {
    return this.http.delete<Servico>(`${this.api}/${id}`);
  }

  public inserir(cliente: Partial<Servico>) {
    return this.http.post<Servico>(this.api, cliente);
  }

  public alterar(cliente: Partial<Servico>, id: number) {
    return this.http.put<Servico>(`${this.api}/${id}`, cliente);
  }
}