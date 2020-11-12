import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputSubmitComponent } from './components/input-submit/input-submit.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { InputTextareaComponent } from './components/input-textarea/input-textarea.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { InputToggleComponent } from './components/input-toggle/input-toggle.component';
import { InputListComponent } from './components/input-list/input-list.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { InputErrorComponent } from './components/input-error/input-error.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    InputSubmitComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputToggleComponent,
    InputListComponent,
    InputSearchComponent,
    InputErrorComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputSubmitComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputToggleComponent,
    InputListComponent,
    InputSearchComponent,
    InputErrorComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
