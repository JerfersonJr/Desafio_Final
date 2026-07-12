import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  
  public usuarioLogado = signal<string>('');

  login(usuario: string, senha: string): boolean {
    if (usuario === 'Jerferson' && senha === '123') {
      this.isAuthenticatedSignal.set(true);
      this.usuarioLogado.set('Jerferson Silva (Analista de Suprimentos)');
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticatedSignal.set(false);
    this.usuarioLogado.set('');
  }
}