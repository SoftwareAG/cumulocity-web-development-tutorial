import { NgModule } from '@angular/core';
import { CoreModule, DynamicComponentDefinition, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { ContextWidgetConfig } from '@c8y/ngx-components/context-dashboard';
import { DeviceInfoComponent } from './device-info.component';

@NgModule({
  imports: [CoreModule],
  exports: [],
  declarations: [DeviceInfoComponent],
  providers: [
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: [
        {
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
        },
      ] as DynamicComponentDefinition[],
    },
  ],
})
export class DeviceInfoModule {}
