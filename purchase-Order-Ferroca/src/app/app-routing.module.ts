import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'product-registration',
    loadChildren: () => import('./product-registration/product-registration.module').then( m => m.ProductRegistrationPageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'inventory-record',
    loadChildren: () => import('./inventory-record/inventory-record.module').then( m => m.InventoryRecordPageModule)
  },
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'customer-register',
    loadChildren: () => import('./custormer-register/custormer-register.module').then( m => m.CustormerRegisterPageModule)
  },
  {
    path: 'order-status',
    loadChildren: () => import('./order-status/order-status.module').then( m => m.OrderStatusPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
