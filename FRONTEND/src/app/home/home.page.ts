import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon, ToastController
} from '@ionic/angular/standalone';
import { ClienteService } from '../servicos/cliente.service';
import { Cliente } from 'src/modelos/cliente';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class HomePage {
  protected clientes: Cliente[] = [];
  private clienteService = inject(ClienteService);
  private toastController = inject(ToastController)

  constructor() {
    addIcons({ trashOutline });
    this.obterUsuarios();
  }

  protected excluir(id: number) { // a função excluir recebe o id (number) de parametro
    console.log('método excluir');
    this.clienteService.excluir(id)
    .subscribe({
      //sucesso
      next: () => {
        this.obterUsuarios();
        this.exibirMensagem("Usuário excluído.");
      },
      //erro
      error: (erro) => {
        console.log(erro);
        this.exibirMensagem("Usuário não encontrado.");
      },
    });
  }

  protected obterUsuarios() {
    //Assíncrona
    this.clienteService.obterTodos().subscribe((clientes) => {
      this.clientes = clientes;
      console.log(this.clientes);
    });
  }

  private async exibirMensagem(message: string) {
    const toast = await this.toastController.create({ // cria um toast
      message: message, // define que a mensagem do toast vai ser a mesma passada por parametro
      duration: 1500,
      position: "bottom",
    });

    await toast.present();
  }
}
