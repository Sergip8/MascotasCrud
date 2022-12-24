import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from "src/app/services/mascota.service";

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent implements OnInit {
  id!: number
  mascota!: Mascota
  loading: boolean = false;
  mascota$!: Observable<Mascota>

  constructor(private _mascotaService: MascotaService, private aRoute: ActivatedRoute)  { 
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    
  }

  ngOnInit(): void {

    // this.aRoute.params.subscribe(data =>{
    //   this.id = data['id']
      this.obtenerMascota()
      
   // })
    
  }
   obtenerMascota(){
    this.loading = true
    this.mascota$ = this._mascotaService.getMascota(this.id)
    this.loading = false
  //   this._mascotaService.getMascota(this.id).subscribe({
  //     next: (data) => {
  //       this.mascota = data
  //     },
  //     error: (e) => {
       
  //       alert("se jodio esta joda");
  //     },

  //     complete: () => console.log(""),
  //   })
  }

}
