import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NoContentComponent } from './modules/core/components/no-content';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
    { path: '**', component: NoContentComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
