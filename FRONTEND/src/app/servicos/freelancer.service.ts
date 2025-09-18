import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Freelancer } from 'src/modelos/freelancer';
@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private api = 'http://localhost:3000/freelancers'; // link da api
  private http = inject(HttpClient);

  constructor() {}

  // funções que executam metodos http 
  public obterTodos() {
    return this.http.get<Freelancer[]>(this.api);
  }

  public obterPeloId(id: string) {
    return this.http.get<Freelancer>(`${this.api}/id/${id}`);
  }

  public obterPeloNome(nome: string) {
    return this.http.get<Freelancer[]>(`${this.api}/nome/${nome}`);
  }
  public obterPeloCPF(cpf: string) {
    return this.http.get<Freelancer[]>(`${this.api}/cpf/${cpf}`);
  }

  public excluir(id: number) {
    return this.http.delete<Freelancer>(`${this.api}/${id}`);
  }

  public inserir(cliente: Partial<Freelancer>) {
    return this.http.post<Freelancer>(this.api, cliente);
  }

  public alterar(cliente: Partial<Freelancer>, id: Freelancer) {
    return this.http.put<Freelancer>(`${this.api}/${id}`, cliente);
  }
}