import { Routes } from '@angular/router';
import { Dashboard } from './Components/dashboard/dashboard';
import { StartNewLead } from './Components/start-new-lead/start-new-lead';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'start-new-lead', component: StartNewLead }
];
