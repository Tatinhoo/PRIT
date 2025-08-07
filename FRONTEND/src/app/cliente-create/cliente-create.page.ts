import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,

} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircle,
  checkmarkOutline,
  closeCircle,
  closeCircleOutline,
} from 'ionicons/icons';
import { ClienteService } from '../servicos/cliente.service';
import { Cliente } from 'src/modelos/cliente';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.page.html',
  styleUrls: ['./cliente-create.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonIcon,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,

  ],
})
export class ClienteCreatePage {
  private id: number = -1; //-1 está em modo de cadastro.
  private router = inject(Router);

  private clienteService = inject(ClienteService);

  private formBuilder = inject(NonNullableFormBuilder); // Define o formulário de Cliente
  protected clienteForm = this.formBuilder.group({
    nome: [''],
    dataNasc: [new Date().toISOString()],
    email: [''],
    cpf: [''],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {
    addIcons({ closeCircle, checkmarkOutline, addCircle, closeCircleOutline });

    const currentNav = this.router.getCurrentNavigation();
    if (currentNav?.extras.state) {
      const extras = currentNav.extras;
      // console.log(extras.state);
      let cliente = extras.state as Cliente;
      this.id = cliente.id;

      let clienteSemId: Partial<Cliente> = cliente;

      delete clienteSemId.id;

      console.log(this.id, cliente, clienteSemId);

      this.clienteForm.setValue(cliente);
      this.clienteForm.controls.dataNasc.setValue(
        new Date(Number(cliente.dataNasc)).toString()
      );
    }
  }

  cadastrar() {
    // console.log(this.alunoForm.value);
    if (this.id == -1) {
      //Cadastro
      this.clienteService.inserir(this.clienteForm.value).subscribe({
        next: (cliente) => {
          // console.log(cliente);
          this.router.navigate(['/cliente-list']); // depois de criar volta para a lista
          console.log('roteamento cliente list');
          
        },
        error: (erro) => {
          console.log(erro.error);
        },
      });
    } else {
      //Alteracao
      this.clienteService.alterar(this.clienteForm.value, this.id).subscribe({
        next: (cliente) => {
          console.log(cliente);
          this.router.navigate(['/cliente-list']) // depois de alterar volta para a lista
          
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
