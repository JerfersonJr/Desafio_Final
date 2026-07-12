import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario = '';
  senha = '';
  erroMensagem = '';
  
  valores = [
    { titulo: 'Excelência', desc: 'Busca contínua pela melhor qualidade nos processos.' },
    { titulo: 'Eficiência', desc: 'Otimização de tempo e eliminação de desperdícios.' },
    { titulo: 'Somos um Time', desc: 'Trabalho colaborativo e integrado entre setores.' },
    { titulo: 'Compromisso', desc: 'Responsabilidade com as entregas e fornecedores.' },
    { titulo: 'Cuidado Centrado no Paciente', desc: 'Garantir que o insumo chegue rápido a quem precisa.' }
  ];
  
  slideAtivo = signal(0);
  
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    setInterval(() => {
      this.slideAtivo.update(index => (index + 1) % this.valores.length);
    }, 3500);
  }

  onSubmit() {
    if (this.authService.login(this.usuario, this.senha)) {
      this.router.navigate(['/recebimento']);
    } else {
      this.erroMensagem = 'Usuário ou senha inválidos! (Use: admin / clinica123)';
    }
  }

  esqueciSenha() {
    alert('Para recuperar o seu acesso ou redefinir a senha, por favor entre em contato com o Departamento de TI / Helpdesk da clínica através do ramal 4004.');
  }
}