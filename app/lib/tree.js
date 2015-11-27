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
        this.currentTime += dt;

        if(this.currentTime > 1000){
            this.alpha +=0.1;
            this.currentTime = 0;
        }
     }
    // move(dt){
    //     this.x += Math.sin(this.angle * Math.PI/180) * this.vx;
    //     this.y += Math.cos(this.angle * Math.PI/180) * this.vy;
    //     if(this.life <= 100){
    //         this.alpha = (this.life/100);
    //     }
    //     this.life -= dt;
    //     if(this.life <= 0){
    //         this.isAlive = false;
    //     }
    // }
    //  reset(options) {
    //     this.x = options.x;
    //     this.y = options.y;
        
    //     this.life = Math.random()*2000 + 1000;
    //     this.alpha = 1;
    //     // this.isAlive = true;
    // }




}
export default Tree