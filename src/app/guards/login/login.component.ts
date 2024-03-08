import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username: any;
  password: any;
  error: any;
  senhaIncorreta = false

  constructor(private userService: UsuarioService, private router: Router) { }

  login() {
    this.userService.getUserByEmail(this.username, this.password).subscribe(
      {
        next:
          (response) => {
            // if(response){
            this.router.navigate(['home'])
            // }else{
            // this.senhaIncorreta = true;
            // }
          }, error(err) {
            console.log(err);

          },
      }
    );
  }

  onPasswordInput(event: any): void {
    this.password = event.target.value;
  }

}
