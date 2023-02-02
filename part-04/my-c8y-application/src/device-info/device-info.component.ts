import { Component, OnInit } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';

@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.component.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit {
  private readonly DEVICE_ID = '{{deviceId}}';

  tempteratureMeasurement: TemperatureMeasuerement;

  deviceDetails: DeviceDetails;

  constructor(private deviceInfoService: DeviceInfoService) {}

  ngOnInit() {
    this.initDeviceDetails();
    this.subscribeForTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails(this.DEVICE_ID);
  }

  private subscribeForTemperatureMeasurements() {
    this.deviceInfoService.temperatureMeasurement$.subscribe(
      (temperatureMeasurement) => (this.tempteratureMeasurement = temperatureMeasurement)
    );

    this.deviceInfoService.subscribeForTemperatureMeasurements(this.DEVICE_ID);
  }
}
