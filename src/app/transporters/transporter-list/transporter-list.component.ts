import { Component, OnInit } from '@angular/core';
import { Transporter } from 'src/app/domain/transporter';
import { TransportersService } from 'src/app/services/transporters.service';

@Component({
  selector: 'app-transporter-list',
  templateUrl: './transporter-list.component.html',
  styleUrls: ['./transporter-list.component.css']
})
export class TransporterListComponent implements OnInit {

  transporters: Transporter[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = this.transporters.length;

  constructor(private transportersService: TransportersService) {
  }

  async ngOnInit() {
    this.transporters = await this.transportersService.findAll().toPromise();
  }
}
