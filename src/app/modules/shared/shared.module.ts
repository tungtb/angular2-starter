import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

// import { AwesomePipe }         from './awesome.pipe';
// import { HighlightDirective }  from './highlight.directive';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [  ],
  exports:      [ 
                  CommonModule, FormsModule ]
})
export class SharedModule { }
