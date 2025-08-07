import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cliente } from 'src/modelos/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private api = 'http://localhost:3000/clientes'; // link da api
  private http = inject(HttpClient);

  constructor() {}

  // funções que executam metodos http 
  public obterTodos() {
    return this.http.get<Cliente[]>(this.api);
  }

  public obterPeloId(id: string) {
    return this.http.get<Cliente>(`${this.api}/id/${id}`);
  }

  public obterPeloNome(nome: string) {
    return this.http.get<Cliente[]>(`${this.api}/nome/${nome}`);
  }
  public obterPeloCPF(cpf: string) {
    return this.http.get<Cliente[]>(`${this.api}/cpf/${cpf}`);
  }

  public excluir(id: number) {
    return this.http.delete<Cliente>(`${this.api}/${id}`);
  }

  public inserir(cliente: Partial<Cliente>) {
    return this.http.post<Cliente>(this.api, cliente);
  }

  public alterar(cliente: Partial<Cliente>, id: number) {
    return this.http.put<Cliente>(`${this.api}/${id}`, cliente);
  }
}