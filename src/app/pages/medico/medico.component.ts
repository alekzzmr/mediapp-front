import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../_service/medico.service';
import { Medico } from '../../_model/medico';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medicos: Medico[];

  constructor(private medicoService : MedicoService) { }

  ngOnInit(): void {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }

}
