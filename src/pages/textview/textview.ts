import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TextviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-textview',
  templateUrl: 'textview.html',
})
export class TextviewPage {
  public textToshow = true;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.textToshow = navParams.get("first");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TextviewPage');
  }

}
