import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
/**
 * Pipes
 */
import { GenderPipe } from './pipes/gender.pipe';
/**
 * Directives
 */
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { DisableButtonDirective } from './directives/disable-button.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [GenderPipe, InfiniteScrollDirective, DisableButtonDirective],
	exports: [GenderPipe, InfiniteScrollDirective, DisableButtonDirective, CommonModule, FormsModule]
})
export class SharedModule { }