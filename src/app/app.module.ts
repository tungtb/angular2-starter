import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
	NgModule,
	ApplicationRef
} from '@angular/core';
import {
	removeNgStyles,
	createNewHosts,
	createInputTransfer
} from '@angularclass/hmr';
import {
	RouterModule,
	PreloadAllModules
} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdSlideToggleModule} from '@angular/material';

/*
 * Platform and Environment providers/directives/pipes
 */
import '../styles/styles.scss';
import '../styles/headings.css';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { BaseComponent } from './pages/base';
import { LoginComponent } from './pages/login';
import { HomeComponent } from './pages/home';
import { AboutComponent } from './pages/about';
import { NoContentComponent } from './pages/no-content';
import { XLargeDirective } from './pages/home/x-large';
import { NavbarComponent } from './components/navbar';
import { GenderPipe } from './pipes/gender.pipe';
import { CookieModule } from 'ngx-cookie';
//Directive
import { InfiniteScrollDirective } from './directives/infinite-scroll/infinite-scroll.directive';

// Application wide providers
const APP_PROVIDERS = [
	...APP_RESOLVER_PROVIDERS,
	AppState
];

type StoreType = {
	state: InternalStateType,
	restoreInputValues: () => void,
	disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		BaseComponent,
		LoginComponent,
		AppComponent,
		AboutComponent,
		HomeComponent,
		NoContentComponent,
		XLargeDirective,
		NavbarComponent,
		GenderPipe,
		InfiniteScrollDirective
	],
	imports: [ // import Angular's modules
		BrowserModule,
		CookieModule.forRoot(),
		FormsModule,
		HttpModule,
		MdButtonModule, MdCheckboxModule,BrowserAnimationsModule,MdSlideToggleModule,
		RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		APP_PROVIDERS
	]
})
export class AppModule {

	constructor(
		public appRef: ApplicationRef,
		public appState: AppState
	) { }

	public hmrOnInit(store: StoreType) {
		if (!store || !store.state) {
			return;
		}
		console.log('HMR store', JSON.stringify(store, null, 2));
		// set state
		this.appState._state = store.state;
		// set input values
		if ('restoreInputValues' in store) {
			let restoreInputValues = store.restoreInputValues;
			setTimeout(restoreInputValues);
		}

		this.appRef.tick();
		delete store.state;
		delete store.restoreInputValues;
	}

	public hmrOnDestroy(store: StoreType) {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// save state
		const state = this.appState._state;
		store.state = state;
		// recreate root elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: StoreType) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}

}
