import { AuthGuard } from './user/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, RouterLink, PreloadAllModules } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SelectiveStrategy } from './selective-strategy.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            {   path: 'products',
                // canLoad: [AuthGuard], // but blocks the preloading lazy modules
                canActivate: [AuthGuard],
                data: { preload: true },
                loadChildren: './products/product.module#ProductModule'},
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', component: PageNotFoundComponent }
        ], {
            enableTracing: true,
            // preloadingStrategy: PreloadAllModules // prealod all
            preloadingStrategy: SelectiveStrategy // load only important module pre
        }),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
