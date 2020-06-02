import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy {

	interval;	

  constructor(private router:Router) {
	this.createAnimation();
   }

  ngOnInit(): void {
    var p = "Somos una pastelería dedicada\nTenemos más de 10 sucursales\nactivas.\nAnimate a probar lo bueno\n¡No esperes más!";

    this.createParagraphWithTitle("Hacemos tus sueños realidad",p,"custom-header-text");
    this.setFirstImage();
  }

  click(){
    this.router.navigate(["products"]);
  }

  
  createParagraphWithTitle(title,paragraph,classname){
		
	var p = "";	
	
	var element = document.getElementsByClassName(classname)[0];
	
	var p = "<p class='big-font'>" + title + "<p class='small-font'>";
	
	for( var i = 0 ; i < paragraph.length ;i++){
		if(paragraph[i] == "\n"){
			p += "<br>";
		}
		else {
			p += paragraph[i];
		}
		
	}
	
	p += "</p></p>";
	
	element.innerHTML = p;
		
}


changeImage(index){
	var images = ["baker.jpg","bread-banner1.jpeg","cupcake.jpeg"];
	var mainRoute = '../../assets/';
	var banner = document.getElementById("banner");
	banner.style.backgroundImage = "url(" + mainRoute + images[index%images.length] + ")";
	index +=1;
	return index;
}

createAnimation(){
	var index = 0;
	this.interval = setInterval(() => {
		index = this.changeImage(index); 
	}, 5000);	
}


setImage(event){
	var element = event.srcElement;
	this.setImg(element);
}

setFirstImage(){
	var element = document.getElementById("first-circle");
	this.setImg(element);
	
}

setImg(element){
	var imgElement = document.getElementById("imgCanvas");
	var bckImg = element.style.backgroundImage;
	if(bckImg){
		imgElement["src"] = bckImg.slice(7,bckImg.length-2).toString();
	}
}

ngOnDestroy(): void {
	clearInterval(this.interval);
}


}
