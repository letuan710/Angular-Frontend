import { TokenStorageService } from './_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  display = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService, public translate: TranslateService){

    translate.addLangs(['en', 'vi', 'fr']);
    translate.setDefaultLang('en');
  }


  ngOnInit():void{
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }
  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
