import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RecebimentoComponent } from './pages/recebimento/recebimento.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'recebimento', component: RecebimentoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
