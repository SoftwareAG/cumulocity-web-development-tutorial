import { Injectable } from '@angular/core';
import { InventoryService } from '@c8y/client';
import { Subject, Subscription } from 'rxjs';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { get } from 'lodash';
import { MeasurementRealtimeService } from '@c8y/ngx-components';

@Injectable()
export class DeviceInfoService {
  temperatureMeasurement$: Subject<TemperatureMeasuerement> =
    new Subject<TemperatureMeasuerement>();

  private realtimeSubscription: Subscription;

  private readonly TEMPERATURE_FRAGMENT = 'c8y_Temperature';

  private readonly TEMPERATURE_SERIES = 'T';

  constructor(
    private inventoryService: InventoryService,
    private measurementRealtimeService: MeasurementRealtimeService
  ) {}

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

  subscribeForTemperatureMeasurements(deviceId: string): void {
    this.loadLatestMeasurement(deviceId, this.TEMPERATURE_FRAGMENT, this.TEMPERATURE_SERIES);
  }

  unscubscribeFromTemperatureMeasurements(): void {
    if (!this.realtimeSubscription) {
      return;
    }

    this.realtimeSubscription.unsubscribe();
  }

  private async loadLatestMeasurement(
    deviceId: string,
    measurementFragment: string,
    measurementSeries: string
  ) {
    try {
      this.realtimeSubscription = this.measurementRealtimeService
        .latestValueOfSpecificMeasurement$(measurementFragment, measurementSeries, deviceId)
        .subscribe((measurement) => {
          const temperatureValue: number = get(
            measurement,
            `${measurementFragment}.${measurementSeries}.value`
          );
          const temperatureUnit: string = get(
            measurement,
            `${measurementFragment}.${measurementSeries}.unit`
          );

          this.temperatureMeasurement$.next({ value: temperatureValue, unit: temperatureUnit });
        });
    } catch (error) {
      console.error('Error occurred while loading the latest measurement: ', error);
    }
  }
}
