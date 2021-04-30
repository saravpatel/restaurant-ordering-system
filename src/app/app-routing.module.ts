import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'menu'
}, {
  path: 'menu',
  loadChildren: () => import('./components/menu/menu.module').then(m => m.MenuModule)
}, {
  path: 'order-summary',
  loadChildren: () => import('./components/order-summary/order-summary.module').then(m => m.OrderSummaryModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
