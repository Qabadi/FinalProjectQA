import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-test';

  authService = inject(AuthService);

  constructor(){
    this.authService.login({
      username: 'Quatoria',
      password: 'Quatoria'
    }).subscribe((r) => {
      console.log(r);
    });
  }
}
