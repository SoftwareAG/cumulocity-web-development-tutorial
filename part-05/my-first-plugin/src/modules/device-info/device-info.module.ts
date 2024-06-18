import { NgModule } from '@angular/core';
import { CoreModule, MeasurementRealtimeService, hookComponent } from '@c8y/ngx-components';
import { ContextWidgetConfig } from '@c8y/ngx-components/context-dashboard';
import { DeviceInfoComponent } from './device-info.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, CoreModule],
  exports: [],
  declarations: [DeviceInfoComponent],
  providers: [
    MeasurementRealtimeService,
    hookComponent({
      id: 'device-info.widget',
      label: 'Device Info Widget',
      description: 'This is a sample widget',
      component: DeviceInfoComponent,
      data: {
        settings: {
          noNewWidgets: false,
          ng1: {
            options: {
              noDeviceTarget: false,
              groupsSelectable: false,
            },
          },
        },
      } as ContextWidgetConfig,
    }),
  ],
})
export class DeviceInfoModule {}
