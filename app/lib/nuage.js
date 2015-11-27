import { Sprite } from 'pixi.js';
import Utils from '../utils/number-utils';
class Nuage extends Sprite {
    constructor(options){
        var texture = PIXI.Texture.fromImage("../img/nuage.png");
        super(texture);
        this.options = options;
        this.x = Math.random()*(this.options.x+50)-50;
        this.y = Math.random()*(this.options.y-100);
        this.scale.factor = 1.5;
        this.scale.x = this.scale.factor;
        this.scale.y = this.scale.factor;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.life = Math.random() * 2000;
        this.angle =  Utils.toRadians( Math.floor(Math.random() * 720) );
        this.v = Math.random();
 
     }
     update(dt){
        this.angle =  Utils.toRadians( Math.random() * 360 -1 ) + 1;
        if(this.v < this.x && this.v < this.y){
            this.v = Utils.getRandom(0.3, 0.4);
        } else {
            this.v = this.y + 100;
        }
        this.x = this.x + this.v * Math.cos(this.angle);
        this.y = this.y + this.v * Math.sin(this.angle);
    }
    reset(){
        this.x = this.options.x;
        this.y = this.options.y;
        this.life = Math.random()*2000;
        this.isDead = false;
    }
}
export default Nuage