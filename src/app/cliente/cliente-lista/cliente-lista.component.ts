import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService, LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = new Array<Cliente>()
  clientesLazyLoad: Cliente[] = new Array<Cliente>()

  selecionarTodos: boolean = false
  selectedCustomers: Cliente[] = [];
  total!: number;

  loading!: boolean;
  totalDeRegistros: number = 0

  isServico: boolean = false


  constructor(
    private clienteService: ClienteService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.primengConfig.ripple = true
    this.obterClientes()
  }

  obterClientes() {
    this.clienteService.listar().subscribe(
      (response) => {
        console.log(response);
        
        this.clientes = [...response]
        this.clientesLazyLoad = [...response]
        this.totalDeRegistros = response.length
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.clientes) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.clientes = [...this.clientesLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);

  }

  onSelectionChange(value = []) {
    this.selecionarTodos = value.length === this.total;
    this.selectedCustomers = value;
  }

  clear(table: Table) {
    table.clear();
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente DELETAR este Cliente?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ key: 'bc', severity: 'info', summary: 'Confirmado', detail: 'Confirmado!' });
        this.clienteService.getExcluir(id).subscribe(
          () => {
            this.messageService.add({ key: 'bc', severity: 'success', summary: 'Deletado', detail: 'Cliente deletado com sucesso!' });
            setTimeout(() => {
              return window.location.reload();
            }, 1000)
          }, (erro: any) => {
            if (erro.status == 404) {
              this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erro 404', detail: 'Página não encontrada.' });
            } else if (erro.status == 500) {
              this.messageService.add({ severity: 'error', summary: 'Erro 500', detail: 'Houve um erro ao carregar as informações.' });
            }
            else if (erro != null) {
              this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erro ao deletar', detail: 'Estamos enfrentado alguns erros de sistema. Tente novamente mais tarde.' });
            }
            console.log(erro)
          }
        );

      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({key:'bc', severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({key:'bc', severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }

}
