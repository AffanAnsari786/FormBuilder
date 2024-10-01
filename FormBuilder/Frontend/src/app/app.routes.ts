import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './pages/form/form.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { SavedFormComponent } from './pages/saved-form/saved-form.component';
import { PreviewsavedComponent } from './pages/previewsaved/previewsaved.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: FormComponent },
  { path: 'preview', component: PreviewComponent },

  {
    path: 'saved-forms',
    component: SavedFormComponent,
  },
  {
    path: 'previewsaved',
    component: PreviewsavedComponent,
  },
];
