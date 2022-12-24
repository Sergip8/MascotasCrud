import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Mascota } from "src/app/interfaces/mascota";
import { MascotaService } from "src/app/services/mascota.service";

@Component({
  selector: "app-listado-mascota",
  templateUrl: "./listado-mascota.component.html",
  styleUrls: ["./listado-mascota.component.css"],
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "Nombre",
    "edad",
    "raza",
    "color",
    "peso",
    "icon",
  ];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por pagina";
      this.dataSource.sort = this.sort;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false;
        alert("se jodio esta joda");
      },

      complete: () => console.log(""),
    });
  }

  eliminarMascota(id: number) {
    this.loading = true;

    this._mascotaService.borrarMascota(id).subscribe(() =>{
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    })
   

  }
  mensajeExito(){
    this._snackBar.open("Entrada borrada", "", {
      duration: 2000,
      horizontalPosition: "left",
    });
  }
}
