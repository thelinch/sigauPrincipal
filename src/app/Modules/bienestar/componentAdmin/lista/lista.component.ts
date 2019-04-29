import { Component, OnInit } from '@angular/core';
import { ServicioSolicitadoService } from '../../services/servicio-solicitado.service';
import { Observable } from 'rxjs';
import { servicioSolicitados } from '../../Models/servicioSolicitados';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  serviciosSolicitado: servicioSolicitados[]
  constructor(private servicioSolicitadoService: ServicioSolicitadoService) { }

  ngOnInit() {
    this.listarServicioSolicitadoPorSemestreActual();
  }
  listarServicioSolicitadoPorSemestreActual() {
    let json = {
      codigoMatricula: "2019-I"
    }
    this.servicioSolicitadoService.listarServicioSolicitadoPorSemestreActual(json).subscribe(async listaServicioSolicitado => {
      this.serviciosSolicitado = await listaServicioSolicitado;
    });
  }
}
