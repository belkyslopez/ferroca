import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
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
  // {
  //   path: 'inventory-record',
  //   loadChildren: () => import('./inventory-record/inventory-record.module').then( m => m.InventoryRecordPageModule)
  // },
 {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'customer-register',
    loadChildren: () => import('./custormer-register/custormer-register.module').then( m => m.CustormerRegisterPageModule)
  },
  // {
  //   path: 'order-status',
  //   loadChildren: () => import('./order-status/order-status.module').then( m => m.OrderStatusPageModule)
  // },
  {
    path: 'user-update',
    loadChildren: () => import('./user-update/user-update.module').then( m => m.UserUpdatePageModule)
  },
  {
    path: 'customer-update',
    loadChildren: () => import('./customer-update/customer-update.module').then( m => m.CustomerUpdatePageModule)
  },
  {
    path: 'product-update',
    loadChildren: () => import('./product-update/product-update.module').then( m => m.ProductUpdatePageModule)
  },
  {
    path: 'product-details/:id',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'order-step2',
    loadChildren: () => import('./order-step2/order-step2.module').then( m => m.OrderStep2PageModule)
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./catalogue/catalogue.module').then( m => m.CataloguePageModule)
  },
  {
    path: 'order-register',
    loadChildren: () => import('./order-register/order-register.module').then( m => m.OrderRegisterPageModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./order-list/order-list.module').then( m => m.OrderListPageModule)
  },
  {
    path: 'user-detail',
    loadChildren: () => import('./user-detail/user-detail.module').then( m => m.UserDetailPageModule)
  },
  {
    path: 'customer-detail',
    loadChildren: () => import('./customer-detail/customer-detail.module').then( m => m.CustomerDetailPageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
