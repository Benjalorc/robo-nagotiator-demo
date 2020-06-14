import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDealComponent } from './components/upload-deal/upload-deal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'upload-deal', component: UploadDealComponent}
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
