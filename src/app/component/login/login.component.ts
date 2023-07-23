import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private restService: RestService, private router: Router){}
  public errorMessage: boolean = false

  checkApi(apiKey: string){
    this.restService.checkApi(apiKey)
    .subscribe((res: any) => {
      if(res.cod == '200'){
        this.restService.setApiKey(apiKey)
        this.router.navigate(['/', 'cities'])
      }
      else{
        this.errorMessage = true
      }
    })
  }
}