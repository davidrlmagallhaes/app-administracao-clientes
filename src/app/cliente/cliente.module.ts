import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [
    ClienteComponent,
    ClienteListaComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RippleModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ListboxModule,
    InputMaskModule,
    TooltipModule,
    ToastModule,
    PanelModule
  ]
})
export class ClienteModule { }
