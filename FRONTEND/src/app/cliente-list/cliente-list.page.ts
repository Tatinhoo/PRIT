import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButtons,
  IonButton,
  IonSearchbar,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { ClienteService } from '../servicos/cliente.service';
import { Cliente } from 'src/modelos/cliente';
import { addIcons } from 'ionicons';
import { addCircle, trashOutline, createOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.page.html',
  styleUrls: ['./cliente-list.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption
  ],
})
export class ClienteListPage {
  private router = inject(Router);
  private clienteService = inject(ClienteService);
  private filtroSelecionado: string = 'nome' // cria a variavel de "filtro" que inicializa como nome
  protected clientes: Cliente[] = [];

  constructor() {
    addIcons({ addCircle, trashOutline, createOutline });
  }
  
  public ionViewDidEnter() { // executa a função "buscar()" quando a página carregar (para listar todos os clientes)
    this.buscar();
  }

  protected selecionarFiltro(evento: any){
    this.filtroSelecionado = evento.detail.value // faz com que o value do select seja armazenado na variavel de filtro

    console.log(this.filtroSelecionado);
    
  }

  protected pesquisar(evento: Event) {
    const searchBar = evento.target as HTMLIonSearchbarElement; // define o arvo do evento como a searchbar
    console.log(searchBar.value);

    switch (this.filtroSelecionado) { // um switch para ver qual filtro está selecionado
      // Se o filtro for por CPF (Chave primária)
      case 'cpf':
      if (searchBar.value) { // verifica se existe algo na searchbar
        this.clienteService.obterPeloCPF(searchBar.value).subscribe({ // Executa o "obterPeloCPF" do ClienteService
          next: (clientes) => {
            this.clientes = clientes; // atualiza a array de clientes listados para os filtrados
          },
          error: (erro) => {
            console.log(erro);
          },
        });
      }            
        break;
      // Se o filtro for por Nome
      case 'nome':
      if (searchBar.value) {
        this.clienteService.obterPeloNome(searchBar.value).subscribe({ // Executa o "obterPeloPelo" do ClienteService
          next: (clientes) => {
            this.clientes = clientes; // atualiza a array de clientes listados para os filtrados
          },
          error: (erro) => {
            console.log(erro);
          },
        });
      }        
        break;
    
      default:
        break;
    }

    
  }

  protected buscar() {
    console.log('buscar');
    
    this.clienteService.obterTodos().subscribe((clientes) => { // recebe todos os clientes
      this.clientes = clientes; // atualiza a array de clientes listados
    });
  }

  protected excluir(id: number) {
    this.clienteService.excluir(id).subscribe((_) => {
      this.buscar();
    });
  }

  protected alterar(index: number) {
    const clienteSelecionado = this.clientes[index]
    
    this.router.navigate(
      ['/cliente-create'], 
      { state: clienteSelecionado }
    );
  }

  protected cadastrar() {
    console.log('cadastrar');
    
    this.router.navigate(['/cliente-create'])
  }
}
