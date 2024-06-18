import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CoreModule,
  BootstrapComponent,
  RouterModule,
} from '@c8y/ngx-components';
import { DeviceInfoModule } from '../device-info/device-info.module';
import { NamedDashboardModule } from '../named-dashboard/named-dashboard.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    CoreModule.forRoot(),
    NamedDashboardModule,
    DeviceInfoModule,
  ],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}
