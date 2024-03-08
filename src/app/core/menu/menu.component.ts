import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Usuario } from 'src/app/usuario/usuario';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: Usuario = new Usuario;
  nome = 'ADM';
  exibirSide = false;
  exibirCondomino = false;
  exibirCadastro = false;
  exibirCartao = false;

  items!: MenuItem[];
  itemMenu!: MenuItem[];

  constructor(
    private router: Router,

    private usuarioService: UsuarioService

  ) {
  }

  ngOnInit() {
    this.getItensMenu()
    if (Number(localStorage.getItem('idUsuario')) > 0) {

      this.getUsuario()
    }


  }

  getItensMenu() {

    this.itemMenu = [
      {
        label: 'ADM', 
        icon: 'pi pi-fw pi-user',
        command: () => this.exibirSide = false
      },
      {
        label: 'Página Inicial',
        icon: 'pi pi-fw pi-home'
      },
      {
        label: 'Cadastro',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Clientes',
            icon: 'pi pi-fw pi-tag',
            routerLink: '/clientes',
            command: () => this.exibirSide = false
          }
        ]
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  getUsuario() {
    // this.usuarioService.getById(Number(localStorage.getItem('idUsuario')))
    //   .subscribe(
    //     response => {
    //       this.getItensMenu(response)
    //     }
    //   )
  }


  logout() {
    localStorage.clear();

    this.router.navigate(['./']).then(() => {
      window.location.reload();
    })

  }

}
