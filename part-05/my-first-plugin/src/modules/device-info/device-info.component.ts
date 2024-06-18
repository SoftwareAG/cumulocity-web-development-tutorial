import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { DeviceDetails, TemperatureMeasuerement } from './device-info.model';
import { DeviceInfoService } from './device-info.service';
import { Input } from '@angular/core';

@Component({
  selector: 'c8y-device-info',
  templateUrl: 'device-info.component.html',
  providers: [DeviceInfoService],
})
export class DeviceInfoComponent implements OnInit, OnDestroy {
  @Input() config!: { device: { id: string; name: string } };

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
      this.config.device.id
    );
  }

  private subscribeForTemperatureMeasurements() {
    this.tempteratureMeasurement =
      this.deviceInfoService.subscribeForTemperatureMeasurements(
        this.config.device.id
      );
  }

  private unsubscribeForTemperatureMeasurements() {
    this.deviceInfoService.unscubscribeFromTemperatureMeasurements();
  }
}
