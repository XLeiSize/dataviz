import d3 from 'd3';
import Data from './data';

// class Map {
// 	constructor(options){
// 		this.width = options.width;
// 		this.height = options.height;
// 	}
// }
// default export Map;

import { Sprite, BLEND_MODES } from 'pixi.js';

class Tree extends Sprite {
    constructor(options){
        var texture = PIXI.Texture.fromImage("./img/arbre.png");
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
        this.mouseover = function(mouseData){
           console.log("MOUSE OVER!");
        }
        this.click = function(mouseData){
		   document.getElementById('parc_infos').innerHTML = 
		   							this.options.content.name + 
		   							'<br>' + 
		   							Math.round(this.options.content.surface /1000) +
		   							"km<SUP>2</SUP>";
            var margin = 40; 
            document.getElementById("parc_infos").style.right = (margin)+"px";
		}
     }
     update(){
        this.scale.factor = this.options.size;
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