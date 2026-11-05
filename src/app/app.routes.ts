import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {TournamentsComponent} from './tournaments/tournaments.component';
import {CoursesComponent} from './courses/courses.component';
import {LogOutComponent} from './log-out/log-out.component'; 
export const routes: Routes = [
    {
        path: 'Login-component',
        component: LoginComponent
    },
    {
        path: "Registration-component",
        component: RegistrationComponent
    },
    {
        path: 'Registration-component',
        component: RegistrationComponent
    },
    {
        path: '',
        component: HomeComponent
    },
   
    {
        path: 'Tournaments-component',
        component: TournamentsComponent
    },
    {
        path: 'Courses-component',
        component: CoursesComponent
    },
    {
        path: 'Logout-component',
        component: LogOutComponent
    },
    {
        path: 'App-component',
        loadComponent: () => import('./app.component').then((c)=>c.AppComponent)
    }

];
