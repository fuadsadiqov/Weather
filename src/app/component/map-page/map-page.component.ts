import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.loadScript('../../../assets/mapdata.js');
    this.loadScript('../../../assets/countrymap.js');
  }
  private loadScript(scriptUrl: string) {
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }

  onClick(){
    console.log("Clicked");
    
  }
}