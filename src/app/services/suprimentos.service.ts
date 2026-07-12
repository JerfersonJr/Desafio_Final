import { Injectable, signal } from '@angular/core';

export interface ItemPedido {
  id: number;
  nome: string;
  qtdComprada: number;
  qtdPendente: number;
  entregue: boolean;
  parcial: boolean;
  qtdRecebida: number;
  naoConformidade: boolean;
  motivoNaoConformidade: string;
}

export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  itens: ItemPedido[];
}

@Injectable({
  providedIn: 'root'
})
export class SuprimentosService {
  public fornecedores = signal<Fornecedor[]>([
    {
      id: 1,
      nome: 'Drogamed Distribuidora Ltda',
      cnpj: '12345678000190',
      itens: [
        { id: 101, nome: 'Amoxicilina 500mg (Cx c/ 30 cp)', qtdComprada: 100, qtdPendente: 100, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' },
        { id: 102, nome: 'Dipirona Sódica Injetável 500mg/ml', qtdComprada: 500, qtdPendente: 500, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' }
      ]
    },
    {
      id: 2,
      nome: 'Hospitalla Materiais Médicos',
      cnpj: '98765432000110',
      itens: [
        { id: 201, nome: 'Seringa Descartável 10ml (Unidade)', qtdComprada: 1000, qtdPendente: 1000, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' },
        { id: 202, nome: 'Luva de Procedimento Látex (Cx c/ 100)', qtdComprada: 200, qtdPendente: 200, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' }
      ]
    },
    {
      id: 3,
      nome: 'White Martins Gases Industriais',
      cnpj: '33611880000114',
      itens: [
        { id: 301, nome: 'Cilindro Oxigênio Medicinal M10 (un)', qtdComprada: 15, qtdPendente: 15, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' },
        { id: 302, nome: 'Óxido Nitroso Medicinal 30kg (un)', qtdComprada: 5, qtdPendente: 5, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' }
      ]
    },
    {
      id: 4,
      nome: 'Cirúrgica Mafra Distribuição',
      cnpj: '64812555000180',
      itens: [
        { id: 401, nome: 'Fio de Sutura Nylon 4-0 (Cx c/ 24)', qtdComprada: 50, qtdPendente: 50, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' },
        { id: 402, nome: 'Avental Descartável Impermeável (un)', qtdComprada: 600, qtdPendente: 600, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' },
        { id: 403, nome: 'Máscara Cirúrgica Tripla PFF2 (un)', qtdComprada: 2000, qtdPendente: 2000, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' }
      ]
    },
    {
      id: 5,
      nome: 'BioDiag Diagnósticos S.A.',
      cnpj: '11222333000155',
      itens: [
        { id: 501, nome: 'Kit Teste Rápido Covid-19 (Cx c/ 25)', qtdComprada: 40, qtdPendente: 40, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' },
        { id: 502, nome: 'Tiras de Glicemia Accu-Chek (Cx c/ 50)', qtdComprada: 120, qtdPendente: 120, entregue: false, parcial: false, qtdRecebida: 0, naoConformidade: false, motivoNaoConformidade: '' }
      ]
    }
  ]);

  salvarConferenca(fornecedorId: number, itensAtualizados: ItemPedido[]) {
    this.fornecedores.update(lista => 
      lista.map(f => {
        if (f.id === fornecedorId) {
          const novosItens = itensAtualizados.map(item => {
            let saldoAtual = item.qtdPendente;
            if (item.entregue) {
              if (item.parcial && item.qtdRecebida > 0) {
                saldoAtual = Math.max(0, item.qtdPendente - item.qtdRecebida);
              } else if (!item.parcial) {
                saldoAtual = 0; 
              }
            }
            return { ...item, qtdPendente: saldoAtual, entregue: false, parcial: false, qtdRecebida: 0 };
          });
          return { ...f, itens: novosItens };
        }
        return f;
      })
    );
  }
}