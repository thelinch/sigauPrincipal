import { Injectable } from '@angular/core';
import { CicloAcademicoService } from '../services/ciclo-academico.service';
import { cicloAcademicoStore } from '../BD/store/cicloAcademicoStore';
@Injectable({ providedIn: "root" })
export class cicloAcademicoSandBox {
    constructor(private cicloAcademicServico: CicloAcademicoService,
        private cicloAcademicoStore: cicloAcademicoStore) {

    }
    all(): void {
        this.cicloAcademicServico.all().subscribe(listaCicloAcademico => {
            this.cicloAcademicoStore.set(listaCicloAcademico)
        })
    }
}