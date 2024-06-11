import { Component, OnInit } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';

@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.component.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit {
  tempteratureMeasurement: TemperatureMeasuerement;

  deviceDetails: DeviceDetails;

  constructor(private deviceInfoService: DeviceInfoService) {}

  ngOnInit() {
    console.log('init device info component');
    this.initDeviceDetails();

    console.log('subscribe for temperature measurements');
    this.subscribeForTemperatureMeasurements();
  }

  private async initDeviceDetails() {
    this.deviceDetails = await this.deviceInfoService.getDeviceDetails();
  }

  private subscribeForTemperatureMeasurements() {
    this.deviceInfoService.temperatureMeasurement$.subscribe(
      (temperatureMeasurement) => (this.tempteratureMeasurement = temperatureMeasurement)
    );

    this.deviceInfoService.subscribeForTemperatureMeasurements();
  }
}
