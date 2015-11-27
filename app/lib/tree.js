import { Sprite } from 'pixi.js';
import $ from 'jquery';

class Tree extends Sprite {
    constructor(options){
        var texture = PIXI.Texture.fromImage("../img/arbre.png");
        super(texture);
        this.options = options;
        this.x = this.options.x;
        this.y = this.options.y;
        this.scale.factor = this.options.size;
        this.scale.x = this.scale.factor;
        this.scale.y = this.scale.factor;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.interactive = true;
        this.alpha = 1;
        // this.mouseover = function(mouseData){
        //    console.log("MOUSE OVER!");
        // }
        this.click = function(mouseData){
            $('#parc_infos').css({opacity:0});
            var margin = 40; 
            // this.tint = 0x000;
            setTimeout(function(){ 
                $('#parc_infos').html( 
                    '<b>'+options.content.name + 
                    '</b><br>' + 
                    Math.round(options.content.surface /1000) +
                    "km<SUP>2</SUP>");
                $('#parc_infos').css({opacity:1});
            }, 500);


            // document.getElementById("parc_infos").style.right = (margin)+"px";
		}


     }
     update(dt){
        if(this.alpha < 1){
            this.alpha += 0.1;
        }
    
     }

     animate(){
            TweenMax.fromTo(this, Math.random()*3+1, {y:-100}, {y: this.y, ease: Expo.easeOut, delay:1})
     }




}
export default Tree