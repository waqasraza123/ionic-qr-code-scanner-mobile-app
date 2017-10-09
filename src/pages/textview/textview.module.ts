import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TextviewPage } from './textview';

@NgModule({
  declarations: [
    TextviewPage,
  ],
  imports: [
    IonicPageModule.forChild(TextviewPage),
  ],
})
export class TextviewPageModule {}
