import { Injectable, resolveForwardRef } from '@angular/core';
import { InventoryService } from '@c8y/client';
import { Subject } from 'rxjs';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';

@Injectable()
export class DeviceInfoService {
  temperatureMeasurement$: Subject<TemperatureMeasuerement> =
    new Subject<TemperatureMeasuerement>();

  constructor(private inventoryService: InventoryService) {}

  async getDeviceDetails(deviceId: string): Promise<DeviceDetails> {
    try {
      const response = await this.inventoryService.detail(deviceId);
      const deviceManagedObject = response.data;

      return { name: deviceManagedObject.name, type: deviceManagedObject.type };
    } catch (error) {
      console.error('Error occurred while loading the device description: ', error);

      return undefined;
    }
  }

  subscribeForTemperatureMeasurements(): void {
    // publish latest measurement
    this.temperatureMeasurement$.next({ value: 10, unit: '°C' });

    // push random temperature every 10 seconds
    setInterval(
      () => this.temperatureMeasurement$.next({ value: this.getRandomInt(8, 15), unit: '°C' }),
      10000
    );
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
