import { Injectable, resolveForwardRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';

@Injectable()
export class DeviceInfoService {
  temperatureMeasurement$: Subject<TemperatureMeasuerement> =
    new Subject<TemperatureMeasuerement>();

  constructor() {}

  async getDeviceDetails(): Promise<DeviceDetails> {
    return new Promise<DeviceDetails>((resolve) =>
      resolve({ name: 'My test device', type: 'c8y_TestType' })
    );
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
