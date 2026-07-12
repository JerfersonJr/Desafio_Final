import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SuprimentosService, Fornecedor } from '../../services/suprimentos.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recebimento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.css']
})
export class RecebimentoComponent {
  filtroPesquisa = signal('');
  fornecedorSelecionado = signal<Fornecedor | null>(null);
  
  private suprimentosService = inject(SuprimentosService);
  private authService = inject(AuthService);
  private router = inject(Router);

  nomeOperador = this.authService.usuarioLogado;

  fornecedoresFiltrados = computed(() => {
    const busca = this.filtroPesquisa().toLowerCase().trim();
    const listaCompleta = this.suprimentosService.fornecedores();
    
    const apenasPendentes = listaCompleta.filter(fornecedor => {
      return fornecedor.itens.some(item => item.qtdPendente > 0 || item.naoConformidade);
    });
    
    if (!busca) return apenasPendentes;
    
    return apenasPendentes.filter(f => 
      f.nome.toLowerCase().includes(busca) || f.cnpj.includes(busca)
    );
  });

  selecionarFornecedor(fornecedor: Fornecedor) {
    this.fornecedorSelecionado.set(JSON.parse(JSON.stringify(fornecedor)));
  }

  salvar() {
    const fornecedor = this.fornecedorSelecionado();
    if (fornecedor) {
      this.suprimentosService.salvarConferenca(fornecedor.id, fornecedor.itens);
      
      alert(`Sucesso! Recebimento de "${fornecedor.nome}" conferido e registrado por: ${this.nomeOperador()}`);
      
      this.fornecedorSelecionado.set(null);
      this.filtroPesquisa.set('');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}