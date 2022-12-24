import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Mascota } from "src/app/interfaces/mascota";
import { MascotaService } from "src/app/services/mascota.service";

@Component({
  selector: "app-agregar-editar-mascota",
  templateUrl: "./agregar-editar-mascota.component.html",
  styleUrls: ["./agregar-editar-mascota.component.css"],
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;
  opcion: string = 'Agregar';  

  constructor(
    private formBuilder: FormBuilder,
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      nombre: ["", Validators.required],
      raza: ["", Validators.required],
      color: ["", Validators.required],
      edad: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      peso: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
    });

      this.id = Number(aRoute.snapshot.paramMap.get('id'))
      
  }
  ngOnInit(): void {
    if(this.id != 0){
      this.opcion = 'Editar'
      this.obtenerMascota(this.id)
    }
  }

  obtenerMascota(id: number){
    this._mascotaService.getMascota(id).subscribe(data => {
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })
    })
  }
  agregarEditarMascota() {
    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
    
    };

    if(this.id !=0){
      mascota.id = this.id
      this.editarMascota(this.id, mascota)

    }else{
      this.registrarMascota(mascota)
    }
    
  }

  editarMascota(id: number, mascota: Mascota){
    this._mascotaService.UpdateMascota(id, mascota).subscribe(data =>{
      this.mensajeExito("Editada");
      this.router.navigate(['/listadoMascotas'])
    })
  }

  registrarMascota(mascota: Mascota ){
    this._mascotaService.agregarMascota(mascota).subscribe((data) => {
      this.mensajeExito("Agregada");
      this.router.navigate(['/listadoMascotas'])
    });
  }
  mensajeExito(msg: string) {
    this._snackBar.open(`Mascota ${msg}`, "", {
      duration: 2000,
      horizontalPosition: "left",
    });
  }
}
