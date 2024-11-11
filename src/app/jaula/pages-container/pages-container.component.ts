import { Component } from '@angular/core';
import { JaulaCreateComponent } from "../jaula-create/jaula-create.component";
import { JaulaListComponent } from "../jaula-list/jaula-list.component";

@Component({
  selector: 'app-pages-container',
  standalone: true,
  imports: [JaulaCreateComponent, JaulaListComponent],
  templateUrl: './pages-container.component.html',
  styleUrl: './pages-container.component.css'
})
export class PagesContainerComponent {

}
