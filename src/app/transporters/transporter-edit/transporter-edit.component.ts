import {Component, OnInit} from '@angular/core';
import {Transporter} from 'src/app/domain/transporter';
import {ActivatedRoute, Router} from '@angular/router';
import {TransportersService} from 'src/app/services/transporters.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CepService} from '../../services/cep.service';

@Component({
  selector: 'app-transporter-edit',
  templateUrl: './transporter-edit.component.html',
  styleUrls: ['./transporter-edit.component.css']
})
export class TransporterEditComponent implements OnInit {
  transporterFormGroup: FormGroup;
  servicesAccepted = false;
  private cepAtual = '';

  imageError: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private transportersService: TransportersService,
    private cepService: CepService
  ) {
  }

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

  async onSubmit(transporterData: Transporter) {
    if (this.transporterFormGroup.invalid) {
      return;
    }

    if (transporterData.id === 0 && !this.servicesAccepted) {
      alert('É necessário aceitar os termos de serviços!');
      return;
    }

    if (transporterData.id === 0) {
      const transporter = await this.transportersService.createTransporter(transporterData).toPromise();

      if (transporter.id > 0) {
        alert('A transportadora foi cadastrada com sucesso!');

        await this.router.navigate(['/']);
      }
    } else {
      const transporter = await this.transportersService.updateTransporter(transporterData).toPromise();

      if (transporter.id > 0) {
        alert('A transportadora foi editado com sucesso!');

        await this.router.navigate(['/']);
      }
    }
  }

  async searchCepEvent() {
    const cep = this.transporterFormGroup.controls.cep.value;

    if (cep.length === 8 && this.cepAtual !== cep) {
      this.cepAtual = cep;

      const cepResponse = await this.cepService.locateCep(this.cepAtual).toPromise();

      if (cepResponse.localidade === null) {
        alert('CEP não foi encontrado');
        return;
      }

      this.transporterFormGroup.controls.street.setValue(cepResponse.logradouro);
      this.transporterFormGroup.controls.city.setValue(cepResponse.localidade);
      this.transporterFormGroup.controls.district.setValue(cepResponse.bairro);
      this.transporterFormGroup.controls.state.setValue(cepResponse.uf);
    }
  }

  async confirmDelete() {
    if (confirm('Deseja apagar a transportadora?')) {
      await this.transportersService.deleteTransporterById(this.transporterFormGroup.controls.id.value).toPromise();

      alert('A transportadora foi apagada com sucesso!');

      await this.router.navigate(['/']);
    }
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const maxSize = 20971520;
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      if (fileInput.target.files[0].size > maxSize) {
        this.imageError = 'Maximum size allowed is ' + maxSize / 1000 + 'Mb';

        return false;
      }

      if (!allowedTypes.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const target = rs.currentTarget as HTMLInputElement;
          const imgHeight = target.height;
          const imgWidth = target.width;

          if (imgHeight > maxHeight && imgWidth > maxWidth) {
            this.imageError = `Maximum dimentions allowed ${maxHeight}*${maxWidth}px`;
            return false;
          } else {
            this.transporterFormGroup.controls.companyLogo.setValue(e.target.result);
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
