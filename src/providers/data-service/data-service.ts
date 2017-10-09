import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
@Injectable()
export class DataServiceProvider {
  s: string = " ";  
  private url: string  = "http://smartyfox.com/api/scans";
  constructor(public http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }
  getMessages(){
    try{
      return this.http.get(this.url)
      .map((res => res.json()));
    }catch(error){
      
    }
  }
  getTestData(){
    this.s = `[{"id":1,"created_at":"2017-09-05 13:07:17","updated_at":"2017-09-05 13:07:17","scan_id":1,"type":1,"answer":"<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus<\/p>","sort":1},{"id":2,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":2,"type":1,"answer":"<ul>\n   <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.<\/li>\n   <li>Aliquam tincidunt mauris eu risus.<\/li>\n   <li>Vestibulum auctor dapibus neque.<\/li>\n<\/ul>\n         ","sort":1},{"id":3,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":2,"type":1,"answer":"<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.<\/p>","sort":2},{"id":4,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":2,"type":2,"answer":"https:\/\/www.youtube.com\/watch?v=S1mFoDK4sUQ","sort":3},{"id":5,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":1,"type":2,"answer":"https:\/\/www.youtube.com\/watch?v=S1mFoDK4sUQ","sort":2},{"id":6,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":2,"type":3,"answer":"http:\/\/innsite.net.au\/audio\/P005_EN_Daily Life_Escape.mp3","sort":4},{"id":7,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":3,"type":4,"answer":"https:\/\/www.google.com.au\/","sort":2},{"id":8,"created_at":"2017-09-05 13:08:46","updated_at":"2017-09-05 13:08:46","scan_id":3,"type":3,"answer":"http:\/\/innsite.net.au\/audio\/P004_EN_Excavator_Local Help.mp3","sort":1}]`;
    this.s = this.s.replace(/\\n/g, "\\n")  
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
this.s = this.s.replace(/[\u0000-\u0019]+/g,""); 
return JSON.parse(this.s);    
  }

}
