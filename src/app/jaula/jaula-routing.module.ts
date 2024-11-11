import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesContainerComponent } from './pages-container/pages-container.component';

const routes: Routes = [
  {
    path: '',
    component: PagesContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JaulaRoutingModule { }
