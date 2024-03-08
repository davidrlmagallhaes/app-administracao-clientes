import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app-administracao-clientes';

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.translateService.addLangs(['pt'])
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng')
      .subscribe(res => this.primengConfig.setTranslation(res));
  }

  exibindoNavbar() {

    return (this.router.url !== '/login' && !this.router.url.includes('/redirect'))

  }
}


