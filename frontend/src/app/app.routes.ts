import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { DetailContactComponent } from './pages/detail-contact/detail-contact.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeComponent,
        title: 'Lista contactos'
    },
    {
        path: 'registro',
        component: AddContactComponent,
        title: 'Registrar contacto'
    },
    {
        path: 'editar/:id',
        component: AddContactComponent,
        title: 'Editar contacto'
    },
    {
        path: 'detalles/:id',
        component: DetailContactComponent,
        title: 'Detalle del contacto'
    }
];
