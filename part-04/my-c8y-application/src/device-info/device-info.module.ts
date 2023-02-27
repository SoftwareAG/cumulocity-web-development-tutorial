import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
              noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
              ng1: {
                options: {
                  noDeviceTarget: false, // Set this to true to hide the AngularJS device selector.
                  groupsSelectable: false, // Set this, if not only devices should be selectable.
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
