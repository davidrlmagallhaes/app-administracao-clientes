import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from './endereco';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  titulo: string = 'Cadastrar cliente'

  cliente: Cliente = new Cliente
  endereco = new Endereco();

  responsaveis: Cliente[] = new Array<Cliente>()

  clientes: Cliente[] = new Array<Cliente>()
  

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar cliente'
      this.getCliente(id)
    }
    this.getClientes()
  }

  getCliente(id: number) {
    this.clienteService.getById(id).subscribe(
      (response) => {
        console.log(response);
        
        this.cliente = { ...response }
      }
    )
  }

  getClientes() {
    this.clienteService.listar().subscribe(
      (response) => {
        this.responsaveis = [...response]
      }
    )
  }


  getIsEditando() {
    return Boolean(this.cliente.id)
  }

  salvar() {

    this.confirmationService.confirm({
      message: 'Deseja realmente salvar essa cliente?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.getIsEditando()) {
          this.getAlterar()
        } else {
          this.getIncluir()
        }
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }

  getAlterar() {

    this.clienteService.getAlterar(this.cliente.id, this.cliente).subscribe(
      (response) => {

        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'cliente alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/clientes'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getIncluir() {


    this.clienteService.getIncluir(this.cliente).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'cliente incluido com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/clientes'])
        }, 1000);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  inserirEnderecoDoCliente(){
    this.cliente.enderecos.push(this.endereco)
    this.endereco = new Endereco();
  }

}
