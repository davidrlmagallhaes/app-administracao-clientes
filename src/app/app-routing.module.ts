import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteModule } from './cliente/cliente.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './guards/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
        // canActivate: [AuthGuard]
  },
  {
    path: 'clientes',
    loadChildren: () => ClienteModule,
    // canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
