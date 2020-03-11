import {Component, OnInit} from '@angular/core';
import {Transporter} from 'src/app/domain/transporter';
import {TransportersService} from 'src/app/services/transporters.service';

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.css']
})
export class TransporterListComponent implements OnInit {

  transporters: Transporter[] = [];
  filters: { type: string; label: string; value: any; fuzzy: boolean; array: boolean }[] = [];
  estados = [{label: 'Acre', value: 'AC'}, {label: 'Alagoas', value: 'AL'}, {label: 'Amap\u00e1', value: 'AP'}, {
    label: 'Amazonas',
    value: 'AM'
  }, {label: 'Bahia', value: 'BA'}, {label: 'Cear\u00e1', value: 'CE'}, {
    label: 'Distrito Federal',
    value: 'DF'
  }, {label: 'Esp\u00edrito Santo', value: 'ES'}, {label: 'Goi\u00e1s', value: 'GO'}, {
    label: 'Maranh\u00e3o',
    value: 'MA'
  }, {label: 'Mato Grosso', value: 'MT'}, {label: 'Mato Grosso do Sul', value: 'MS'}, {
    label: 'Minas Gerais',
    value: 'MG'
  }, {label: 'Paran\u00e1', value: 'PR'}, {label: 'Para\u00edba', value: 'PB'}, {label: 'Par\u00e1', value: 'PA'}, {
    label: 'Pernambuco',
    value: 'PE'
  }, {label: 'Piau\u00ed', value: 'PI'}, {label: 'Rio Grande do Norte', value: 'RN'}, {
    label: 'Rio Grande do Sul',
    value: 'RS'
  }, {label: 'Rio de Janeiro', value: 'RJ'}, {label: 'Rond\u00f4nia', value: 'RO'}, {
    label: 'Roraima',
    value: 'RR'
  }, {label: 'Santa Catarina', value: 'SC'}, {label: 'Sergipe', value: 'SE'}, {label: 'S\u00e3o Paulo', value: 'SP'}, {
    label: 'Tocantins',
    value: 'TO'
  }];

  constructor(private transportersService: TransportersService) {
  }

  async ngOnInit() {
    this.transporters = await this.transportersService.findAll().toPromise();
  }

  removeFilter(filter: any) {
    this.filters = this.filters.filter(item => item !== filter);
  }

  get allUfsTransporters() {
    return [...new Set(this.transporters.map(item => this.estados.find(estado => estado.value === item.state)))];
  }

  get allDistrictsTransporters() {
    return [...new Set(this.transporters.map(item => item.district))];
  }

  get transportersFilter(): Transporter[] {
    const filteredTransporters: Transporter[] = [];

    if (this.filters.length === 0) {
      filteredTransporters.push(...this.transporters);
    } else {
      for (const transporter of this.transporters) {
        let show = true;

        for (const filter of this.filters) {
          if (filter.fuzzy) {
            show = show && transporter[filter.type].toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
          } else if (filter.array) {
            show = show && transporter[filter.type].includes(filter.value);
          } else {
            show = show && transporter[filter.type] === filter.value;
          }
        }

        if (show) {
          filteredTransporters.push(transporter);
        }
      }
    }

    return [...new Set(filteredTransporters)];
  }

  addFilter(filter: { type: string; label: string; value: any; fuzzy: boolean; array: boolean }) {
    if (filter.value !== '') {
      this.filters.push(filter);
    }
  }
}
