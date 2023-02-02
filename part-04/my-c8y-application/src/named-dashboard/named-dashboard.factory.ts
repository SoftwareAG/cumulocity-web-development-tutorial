import { Injectable } from '@angular/core';
import { NavigatorNode, NavigatorNodeFactory } from '@c8y/ngx-components';

@Injectable()
export class NamedDashboardNavigationFactory implements NavigatorNodeFactory {
  get() {
    return new NavigatorNode({
      label: 'Dashboard',
      icon: 'robot',
      path: 'named-dashboard',
      priority: 50,
    });
  }
}
