import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';

@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.component.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit, OnDestroy {
  private readonly DEVICE_ID = '2104';

  tempteratureMeasurement!: WritableSignal<TemperatureMeasuerement | undefined>;

  deviceDetails!: DeviceDetails | undefined;

  constructor(private deviceInfoService: DeviceInfoService) {}

  ngOnInit() {
    this.initDeviceDetails();
    this.subscribeForTemperatureMeasurements();
  }

  ngOnDestroy(): void {
    this.unsubscribeForTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails(
      this.DEVICE_ID
    );
  }

  private subscribeForTemperatureMeasurements() {
    this.tempteratureMeasurement =
      this.deviceInfoService.subscribeForTemperatureMeasurements(
        this.DEVICE_ID
      );
  }

  private unsubscribeForTemperatureMeasurements() {
    this.deviceInfoService.unscubscribeFromTemperatureMeasurements();
  }
}
