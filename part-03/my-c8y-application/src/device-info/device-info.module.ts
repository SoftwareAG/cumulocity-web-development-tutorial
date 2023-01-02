import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule, HOOK_NAVIGATOR_NODES } from '@c8y/ngx-components';

import { DeviceInfoComponent } from './device-info.component';
import { DeviceInfoNavigationFactory } from './device-info.factory';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'device-info',
    pathMatch: 'full',
  },
  {
    path: 'device-info',
    component: DeviceInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CoreModule],
  exports: [],
  declarations: [DeviceInfoComponent],
  providers: [
    { provide: HOOK_NAVIGATOR_NODES, useClass: DeviceInfoNavigationFactory, multi: true },
  ],
})
export class DeviceInfoModule {}
