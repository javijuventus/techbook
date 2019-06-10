import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';
import { PhoneGuard } from './guards/phone.guard';

const routes: Routes = [
  { path: 'main', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canLoad: [ UsuarioGuard ] },
  { path: 'detail-phone', loadChildren: './pages/detail-phone/detail-phone.module#DetailPhonePageModule', canLoad: [ PhoneGuard ], },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'not-found', loadChildren: './pages/not-found/not-found.module#NotFoundPageModule' },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
