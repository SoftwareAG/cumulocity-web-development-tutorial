import { Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory } from '@c8y/ngx-components';

@Injectable()
export class DeviceInfoNavigationFactory implements NavigatorNodeFactory {
  private readonly DEVICE_INFO_NAVIGATOR_NODE = new NavigatorNode({
    label: 'Device Info',
    icon: 'robot',
    path: 'device-info',
    priority: 100,
  });

  get() {
    return this.DEVICE_INFO_NAVIGATOR_NODE;
  }
}
