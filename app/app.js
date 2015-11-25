import Dat from 'dat-gui';
import Scene from './scene/scene';
import { Sprite, Graphics } from 'pixi.js';
import NumberUtils from './utils/number-utils';
import Data from './lib/data';
import emitter from './lib/event-emitter';
import Tree from './lib/tree';

let angle = 0;


class App {

  constructor() {

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.width = window.innerWidth/2;
    this.height = window.innerHeight/2;

    this.scene = new Scene();
    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );

    // let mapTexture = PIXI.Texture.fromImage('img/map.png');
    // this.map =  new PIXI.Sprite(mapTexture);
    // this.map.scale.set(0.8);
    // this.map.position.set(0,0);
    //  this.scene.addChild(this.map);

    this.options = {
      width : this.width,
      height : this.height
    }

    this.data = new Data(this.options);
    emitter.on('dataLoaded', function(){
      console.log(this.data.coordsXY[0]);
      var coords = this.data.coordsXY;

      for ( var i = 0; i < coords.length; i++){
        let options = {
          x : coords[i].x*0.65,
          y : coords[i].y*1.1,
          size : this.data.surfaces[i],
          content : this.data.contents[i]
        };
        console.log(options);
        this.tree = new Tree(options);
        this.scene.addChild(this.tree);
      }
    }.bind(this));
    
    

    this.addListeners();

    

  }

  /**
   * addListeners
   */
  addListeners() {

    window.addEventListener( 'resize', this.onResize.bind(this) );
    TweenMax.ticker.addEventListener( 'tick', this.update.bind(this) );
  }

  /**
   * update
   * - Triggered on every TweenMax tick
   */
  update() {
    if(this.tree.scale.factor < this.data.surfaces[i]){
      this.tree.scale.factor += 0.1;
    }
      
    
    this.scene.render();


  }



  /**
   * onResize
   * - Triggered when window is resized
   * @param  {obj} evt
   */
  onResize( evt ) {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene.resize( this.width, this.height );


  }


}

export default App;
