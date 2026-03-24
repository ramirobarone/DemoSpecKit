import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="container mt-4">
      <h1>Home</h1>
      <p>Bienvenido a ShoeSell.</p>
      <p class="lead" style="max-width: 600px;">
        Descubre la mejor selección de zapatos para cada ocasión. 
        En ShoeSell encontrarás modelos exclusivos, comodidad garantizada y los mejores precios del mercado. ¡Renueva tu estilo y camina con confianza hoy mismo!
      </p>
    </div>
  `,
})
export class HomeComponent {}
