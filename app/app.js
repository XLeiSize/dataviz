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

    this.animateMap();

    this.DELTA_TIME = 0;
    this.LAST_TIME = Date.now();

    this.width = window.innerWidth/2;
    this.height = window.innerHeight/2;

    let scene = this.scene = new Scene();
    let root = document.body.querySelector('.app')
    root.appendChild( this.scene.renderer.view );

    this.options = {
      width : this.width,
      height : this.height
    }

    this.trees = [];

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
          this.tree = new Tree(options);
          this.trees.push(this.tree);
          scene.addChild(this.tree);
        }
        console.log(this.trees);
        emitter.emit('pushEnd');
      }.bind(this));
    

    // var overlayer = document.getElementById('overlayer');
    // overlayer.style.top = 0;

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
    // emitter.on('pushEnd', function(){

      console.log(this.trees);

    //   for (let i = 0; this.trees.length; i++){
    //     console.log( this.trees[i]);
    //     this.trees[i].update();
    //   }
    // }.bind(this));
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

  animateMap(){
    let el = document.getElementById('map');
    TweenMax.staggerFrom(".ardt", 0.5,{opacity: 0, scale: 1.5, rotation:45, delay: 0.5}, 0.05);
  }



}

export default App;
