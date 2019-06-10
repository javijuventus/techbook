import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { path: 'main', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'detail-phone', loadChildren: './pages/detail-phone/detail-phone.module#DetailPhonePageModule', canLoad: [ UsuarioGuard ] },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
