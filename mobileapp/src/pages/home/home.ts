import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Content } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { Constant } from '../../constants/Constant.var';
import { Storage } from '@ionic/storage';
import { API_URL } from '../../constants/API_URLS.var';
import { LoaderService, SocketService} from '../../service';
//import * as _ from 'lodash';

@IonicPage({
  name: 'home-page'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Constant, SocketService]
})
export class HomePage {
  dataDashboard: any = [];
  currentdate;
  paramsData = {};
  dashboardInfo: any = {};
  trainingDatas: any = {};
  accomplishments: any = {};
  modules: any = [];
  showMore: boolean = false;
  users: any;
  selectedModule;
  coursePercentage;
  moduleId;
  allModulesSet ;
  notificationCount;
  currentUser;
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,public socketService: SocketService, private http: HttpProvider, public constant: Constant, public navParams: NavParams, public storage: Storage, public loader: LoaderService) {
    this.currentdate = this.getCurrentTime();
    this.selectedModule = constant.pages.dashboardLabels.selectModules;
  }
  //first load
  ionViewDidLoad() {

  }

  
  ngAfterViewInit() {
            let self = this;
            this.storage.get('currentUser').then((user: any) => {
            if (user) {
             self.currentUser = user;
              this.getNotification();
            }
        });
  }

  ionViewDidEnter() {
    this.getDashboardInfo();
    this.getModules();
  }
  goToChildPage(status) {
    this.paramsData['status'] = status;
    this.navCtrl.setRoot('training-page', this.paramsData)
  }
  goToAcc(set) {
    this.navCtrl.setRoot('accomplishment-page')
  }
  getDashboardInfo() {
    this.loader.showLoader();
    this.http.getData(API_URL.URLS.getDashboard).subscribe((data) => {
      this.loader.hideLoader();
      this.storage.set('userDashboardInfo', data['dashboardList']).then(() => {
      });
      if(data['isSuccess']){
        this.dashboardInfo = data['dashboardList'];
        this.trainingDatas = this.dashboardInfo.training[0];
        this.accomplishments = this.dashboardInfo.accomplishments;
        this.users = this.dashboardInfo.users[0];
        this.coursePercentage = parseFloat(this.trainingDatas.course) * 100;
      }
    });
  }
  getModules() {
    this.http.getData(API_URL.URLS.getModules).subscribe((data) => {
      if (data['isSuccess']) {
        this.modules = data['programList'];
        this.allModulesSet = data['programList'];
      }
    });
  }
  getCurrentTime(){
    let d      = new Date();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[d.getDay()] + ',' + months[d.getMonth()] + ' ' + d.getDate();
  }
  changeModule(list){
 //  _.remove(this.allModulesSet, list);
    this.selectedModule = list.name;
    this.moduleId = list.id;
    this.trainingDatas = this.dashboardInfo.training[this.moduleId]?this.dashboardInfo.training[this.moduleId]:this.dashboardInfo.training[0];
  }
  goToNotification(){
    this.navCtrl.setRoot('notification-page');
  }

    getNotification(){
    let userId = this.currentUser.userId;
    let socketObj = {
      userId : userId
    };
   this.socketService.getNotification(socketObj).subscribe((data)=>{
       this.notificationCount = data['unReadCount'];
   });
  }

}
