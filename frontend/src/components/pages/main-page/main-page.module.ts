import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MyPipePipe } from './home/adam/Desktop/Praca inzynierska/frontend/src/components/pages/my-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [	MainPageComponent,
      MyPipePipe
   ]
})
export class MainPageModule { }
