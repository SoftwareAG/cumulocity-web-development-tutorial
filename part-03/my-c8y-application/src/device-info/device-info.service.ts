import { Injectable, resolveForwardRef } from '@angular/core';
import { InventoryService, MeasurementService } from '@c8y/client';
import { MeasurementRealtimeService } from '@c8y/ngx-components';
import { Subject } from 'rxjs';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { has, get } from 'lodash';

@Injectable()
export class DeviceInfoService {
  temperatureMeasurement$: Subject<TemperatureMeasuerement> =
    new Subject<TemperatureMeasuerement>();

  private readonly TEMPERATURE_FRAGMENT = 'c8y_Temperature';

  private readonly TEMPERATURE_SERIES = 'T';

  constructor(
    private inventoryService: InventoryService,
    private measurementService: MeasurementService
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

  private async loadLatestMeasurement(
    deviceId: string,
    measurementFragment: string,
    measurementSeries: string
  ) {
    const filter = {
      source: deviceId,
      dateFrom: '1970-01-01',
      dateTo: new Date().toISOString(),
      valueFragmentType: measurementFragment,
      valueFragmentSeries: measurementSeries,
      pageSize: 1,
      revert: true,
    };

    try {
      const response = await this.measurementService.list(filter);

      if (
        !response.data ||
        response.data.length != 1 ||
        !has(response.data[0], `${measurementFragment}.${measurementSeries}`)
      ) {
        return;
      }

      const temperatureValue: number = get(
        response.data[0],
        `${measurementFragment}.${measurementSeries}.value`
      );
      const temperatureUnit: string = get(
        response.data[0],
        `${measurementFragment}.${measurementSeries}.unit`
      );

      this.temperatureMeasurement$.next({ value: temperatureValue, unit: temperatureUnit });
    } catch (error) {
      console.error('Error occurred while loading the latest measurement: ', error);
    }
  }
}
