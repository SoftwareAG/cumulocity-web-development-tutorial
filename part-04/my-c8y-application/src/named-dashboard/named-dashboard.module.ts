import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, HOOK_NAVIGATOR_NODES } from '@c8y/ngx-components';
import { ContextDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { NamedDashboardComponent } from './named-dashboard.component';
import { NamedDashboardNavigationFactory } from './named-dashboard.factory';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'named-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'named-dashboard',
    component: NamedDashboardComponent,
  },
];

@NgModule({
  imports: [
    ContextDashboardModule.config(),
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    ContextDashboardModule,
  ],
  exports: [],
  declarations: [NamedDashboardComponent],
  providers: [
    { provide: HOOK_NAVIGATOR_NODES, useClass: NamedDashboardNavigationFactory, multi: true },
  ],
})
export class NamedDashboardModule {}
