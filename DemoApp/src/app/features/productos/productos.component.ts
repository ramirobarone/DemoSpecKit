import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h1>Productos</h1>
      <table class="table table-striped mt-3" *ngIf="productos.length">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let producto of productos">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.precio }}</td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="!productos.length">No hay productos disponibles.</p>
    </div>
  `,
})
export class ProductosComponent {
  productos = [
    { nombre: 'Zapatilla Running Pro', precio: 1299 },
    { nombre: 'Zapato Casual Elegante', precio: 899 },
    { nombre: 'Bota Urbana', precio: 1499 },
    { nombre: 'Sandalia Verano', precio: 499 },
    { nombre: 'Tenis Deportivo', precio: 1099 },
  ];
  
}
