import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule as ngRouterModule } from '@angular/router';
import { CoreModule, BootstrapComponent, RouterModule } from '@c8y/ngx-components';
import { NamedDashboardModule } from './src/named-dashboard/named-dashboard.module';
import { DeviceInfoModule } from './src/device-info/device-info.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(),
    ngRouterModule.forRoot([], { enableTracing: false, useHash: true }),
    CoreModule.forRoot(),
    DeviceInfoModule,
    NamedDashboardModule,
  ],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}
