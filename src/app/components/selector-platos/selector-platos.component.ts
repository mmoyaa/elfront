import { Component, OnInit } from '@angular/core';
import { PlatosService, Plato } from '../../services/platos.service';


@Component({
  selector: 'app-selector-platos',
  templateUrl: './selector-platos.component.html',
  styleUrls: ['./selector-platos.component.css']
})
export class SelectorPlatosComponent implements OnInit {
  platos: Plato[] = [];
  selectedPlato: Plato | null = null;
  searchTerm: string = '';

  constructor(private platosService: PlatosService) {}

  ngOnInit() {
    this.platosService.getPlatos().subscribe((data) => {
      this.platos = data;
      console.log(this.platos);
    });
  }

  buscarPlato() {
    const platoEncontrado = this.platos.find(plato =>
      plato.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
    if (platoEncontrado) {
      this.selectedPlato = platoEncontrado;
    } else {
      this.selectedPlato = null;
      alert('No se encontró el plato.');
    }
  }
  
  seleccionarPlato(event: any) {
    const platoId = event.target.value;
    this.selectedPlato = this.platos.find(plato => plato.id == platoId) || null;
  }
}