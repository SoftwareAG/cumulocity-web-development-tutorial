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

    console.log('subscribe for temperature measurements');

    // push random temperature every 10 seconds
    setInterval(() => {
      console.log('generate random temperature');
      this.temperatureMeasurement$.next({
        value: this.getRandomInt(8, 15),
        unit: '°C',
      });
    }, 10000);
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
