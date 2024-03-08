import localePt from '@angular/common/locales/pt';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { UsuarioService } from './../../usuario/usuario.service';

import { MenuComponent } from '../menu/menu.component';

import { PanelMenuModule } from 'primeng/panelmenu';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginModule } from 'src/app/guards/login/login.module';

registerLocaleData(localePt, 'pt-BR');

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    PanelMenuModule,
    LoginModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    MenuComponent,
    TranslateModule
  ],
  providers: [
    DatePipe,

    UsuarioService,

    MessageService,
    ConfirmationService,
    TranslateService,

  ]
})
export class CoreModule { }