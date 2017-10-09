import { Component,NgZone } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TextviewPage } from '../textview/textview';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    
    public toggoleShowHide  = true;    
    dataTable : string = `CREATE TABLE IF NOT EXISTS scannerData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scan_id INTEGER ,
        type INTEGER,
        answer TEXT,
        sortOrder INTEGER) `;
    yourVariable: string;
    scannedText: string;
    scanTextCheck: string;
    myType: string;
    sortOrder;
    myText: string;
    status: Boolean;
    me: Response;
    dataList = [];
    recordAvailable: boolean = false;
    public myDatabase: SQLiteObject;
    edited: any = false;
    connectionAvailable : Boolean = false;
    public textToDisplay: string;
    
    
    constructor(private network: Network,
        platform: Platform,
        private toastCtrl: ToastController,
        private dataService: DataServiceProvider, 
        private iab: InAppBrowser,
        public navCtrl: NavController,
        private qrScanner: QRScanner,
        private sqlite: SQLite,
        private streamingMedia: StreamingMedia,
        private zone: NgZone) { 
        this.toggoleShowHide = true;

        platform.ready().then(() => {
            this.sortOrder = 0;
            this.scanTextCheck = " ";
            this.scannedText = "";
            //this.testDataFunction();
            this.network.onConnect().subscribe(() => {
                this.connectionAvailable = true;
              });
              this.network.onDisconnect().subscribe(() => {
                this.connectionAvailable = false;
              });
            if(network.type === 'none')
                this.connectionAvailable = false;
            else{
                this.connectionAvailable = true;
            }
            this.initDatabase();
             this.edited = false;
             this.textToDisplay = "";
             //this.showButton();  
            });
    }

    ionViewDidEnter(){
      this.toggoleShowHide = true;
    }
    itemClicked(){
        this.toggoleShowHide = false;
        this.scan();
      }
    testDataFunction(){
        this.dataService.getMessages().subscribe(data => {
            this.dataList = data;
            for (let entry of this.dataList) {
                console.log(""+entry.scan_id);
            }
        });

    }

    checkInternet(){
        return this.connectionAvailable;
    }
    showButton(){
        this.toggoleShowHide = true;
    }
    initDatabase(){
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db:SQLiteObject) =>{
            this.myDatabase = db;
            this.myDatabase.executeSql(this.dataTable,{}).then(() => {
                this.getDataFromServer();
            }).catch(e => console.log(e));    
            
        }).catch(e=>console.log(e))  
       
    }
    
    getDataFromServer(){
        this.dataService.getMessages().subscribe(data => {
            this.dataList = data;
            this.deleteFromdatabase();
            
        });
    }
    
    deleteFromdatabase(){
        this.myDatabase.executeSql('DELETE FROM scannerData',{}).then(()=>{
            console.log('Executed SQL Table Empty');
            this.addToDataBase();
        }).catch(e=>console.log(e));    
    }
    
    addToDataBase(){    
        //let i = 1;
        for (let entry of this.dataList) {
            console.log(entry.answer);
            this.myDatabase.executeSql("insert into scannerData(scan_id,type,answer,sortOrder) values (?,?,?,?)", [entry.scan_id,entry.type,entry.answer,entry.sort]);
           // i++;
        }
    }
  
    scan(){
        this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
        if (status.authorized) {
            // camera permission was granted
            console.log("Authorized");    
            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log("Scanned");
            console.log(text);
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            if(text == this.scannedText){
                this.sortOrder += 1;
            }
            else{
                this.scannedText = text;    
                this.sortOrder = 1;
            }
           // this.showButton();
            this.lookIntoDatabase();
            });
            //show camera preview
            this.qrScanner.show();  
            //wait for user to scan something, then the observable callback will be called
    
        } else if (status.denied) {
            console.log("Denied");
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
        } else {
            console.log("Denied temp");
        }
        })
        .catch((e: any) => console.log('Error is', e));
    }

 
    lookIntoDatabase(){
        this.myDatabase.executeSql('SELECT * FROM scannerData where scan_id = ?', [+this.scannedText]).then( 
            (data) => {
                if(data.rows.length >0){
                    let flag = 0;
                    for(let x =0; x<data.rows.length; x++){
                            if(data.rows.item(x).sortOrder == this.sortOrder){
                                this.myType = data.rows.item(x).type+"";
                                this.myText = data.rows.item(x).answer+"";
                                flag = 1; 
                            }

                    }
                   /* if(flag == 0){
                        this.sortOrder = 0;
                        this.myType = data.rows.item(0).type+"";
                        this.myText = data.rows.item(0).answer+"";
                    }*/
                    this.doSomeThingWithData();
                }
                else{
                    this.recordAvailable = false;
                    this.presentToast("Product Not Found!");
                    this.showButton();
                }
            } 
            );
    }

    doSomeThingWithData(){
        if(this.myType == "1"){
        this.navCtrl.push(TextviewPage,{
            first: this.myText
        })
        }
        else if(this.checkInternet()){
            if(this.myType == "2"){
                let tempArray = this.myText.split('.');
                let len = tempArray.length;
                if(tempArray[len-1] == "mp4" || tempArray[len-1] == "mkv" || tempArray[len-1] == "flv"){
                    this.playVideo();
                }
                else{
                    this.openLinkInBrowser();
                }

           
            }
            if(this.myType == "3"){
                this.playAudio();
            }
            if(this.myType == "4"){
                this.openLinkInBrowser();
            }
        }else{
            this.presentToast("Internet Not Available!");
            this.showButton();
        }
    }
    
    public playVideo(){
        let options: StreamingVideoOptions = {
            successCallback: () => { this.showButton(); },
            errorCallback: (e) => { 
                this.presentToast("Error Playing Video!");
                this.showButton();
             },
            orientation: 'landscape'
        };
        this.streamingMedia.playVideo(this.myText, options);
    }
    
    public stopPlayingAudio(){
        this.streamingMedia.stopAudio();
    }

    public playAudio(){
        let options: StreamingAudioOptions = {
            successCallback: () => { this.showButton(); },
            errorCallback: (e) => { 
                this.presentToast(e+":Error Playing Audio!");
                this.showButton();
        },
            initFullscreen: true,
        };
        this.streamingMedia.playAudio(this.myText, options);
    }
    
    public openLinkInBrowser(){
        const browser = this.iab.create(this.myText);    
        this.zone.run(() => {
            this.toggoleShowHide = true;
        });
        browser.show();
        browser.on("exit").subscribe(()=>{
            this.showButton();
        });       
    }

    presentToast(msg: String) {
        let toast = this.toastCtrl.create({
          message: ''+msg,
          duration: 4000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      
    }
}