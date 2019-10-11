import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { archivoBase } from "../../Models/archivoBase";

@Component({
  selector: "app-list-archivos",
  templateUrl: "./list-archivos.component.html",
  styleUrls: ["./list-archivos.component.css"]
})
export class ListArchivosComponent implements OnInit {
  @Input() archivos: archivoBase[];
  @Input() isButtonEliminateArchive: boolean;
  @Output() EventEmitterArchivoEliminate: EventEmitter<number>;
  @Output() EventemmiterDowloadFile: EventEmitter<number>;
  constructor() {
    this.EventEmitterArchivoEliminate = new EventEmitter();
    this.EventemmiterDowloadFile = new EventEmitter();
    this.isButtonEliminateArchive = true;
  }

  ngOnInit() {}
  eliminarArchivo(id) {
    this.EventEmitterArchivoEliminate.emit(id);
  }
  downloadFile(id) {
    this.EventemmiterDowloadFile.emit(id);
  }
}
