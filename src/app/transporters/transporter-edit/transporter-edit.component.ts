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
  transporter: Transporter = new (class implements Transporter {
    cep = "";
    city = "";
    cnpj = "";
    company = "";
    companyLogo = "";
    district = "";
    email = "";
    id = 0;
    mobileNumber = "";
    modal: string[] = [];
    name = "";
    phoneNumber = "";
    street = "";
    streetNumber = "";
    whatsappNumber = "";
  })();

  private transporterFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private transportersService: TransportersService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      const id = params.id;

      if (id !== undefined) {
        this.transporter = await this.transportersService
          .findTransporterById(id)
          .toPromise();
      }
    });

    this.transporterFormGroup = this.formBuilder.group(this.transporter);
  }

  async onSubmit(transporterData) {
    this.transporter = transporterData;
    this.transporterFormGroup.reset();

    console.warn("Your order has been submitted", this.transporter);
  }
}
