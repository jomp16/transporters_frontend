import { Component, OnInit } from "@angular/core";
import { Transporter } from 'src/app/domain/transporter';
import { ActivatedRoute } from '@angular/router';
import { TransportersService } from 'src/app/services/transporters.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: "app-transporter-edit",
  templateUrl: "./transporter-edit.component.html",
  styleUrls: ["./transporter-edit.component.css"]
})
export class TransporterEditComponent implements OnInit {
  transporterFormGroup: FormGroup;
  servicesAccepted = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private transportersService: TransportersService
  ) {}

  async ngOnInit() {
    this.transporterFormGroup = this.formBuilder.group(new Transporter());

    await this.route.params.subscribe(async params => {
      const id = params.id;

      if (id !== undefined) {
        const transporter = await this.transportersService
          .findTransporterById(id)
          .toPromise();

        this.transporterFormGroup.patchValue(transporter);
      }
    });
  }

  async onSubmit(transporterData) {
    this.transporterFormGroup.reset();

    console.warn("Your order has been submitted", transporterData);
  }
}
