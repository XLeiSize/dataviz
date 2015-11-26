import d3 from 'd3';
import Nuage from './nuage';




class Pollution {
    constructor(scene){
        this.scene = scene;
        this.pool = [];
        this.voiture = [];
        this.chauffage = [];
        this.usine = [];
        this.transport = [];
        this.agriculture = [];
        this.options = {
            x: window.innerWidth/2,
            y: window.innerHeight-150
        };
        this.currentTime = 0;

        this.createPool(1000,this.options);
        
		
     }
      // Creer le Pool
    createPool(nb, options){

        for (let i = 0; i < nb; i++) {
            let n = new Nuage(options);
            this.pool.push(n);
        }
    }

   // Recupere le premier particule du pool, puis l'enleve
    getNuageFromPool(){

        let n = this.pool[0];

        this.pool.splice(0,1);
        return n;

    }
    // Remet la particule dans le pool
    returnNuageToPool(n){
        n.reset();
        this.pool.push(n);
    }

    // fonction throw qui affiche les particules
    throw(nb){
        for (let i = 0; i < nb; i++) {
            let n = this.getNuageFromPool();

            this.nuages.push(n);
            console.log(n.position);
            this.scene.addChild(n);
        }
    }

    update(dt, category){
        for(var i = 0; i < category.length; i++) {

                let n = category[i];
                if(n.isDead){
                    this.returnNuageToPool(n);
                    this.nuages.c.splice(i,1);
                    this.scene.removeChild(n);          
                }
                n.update(dt);
            }  
        }

    throw1(nb, alpha, category){
        for (let i = 0; i < nb; i++) {
            let n = this.getNuageFromPool();
            n.alpha = alpha;
            category.push(n);
            this.scene.addChild(n);
        }
    }

    clear(category){
        for(let i = 0; i < category.length; i++){
            let c = category[i];
            this.scene.removeChild(c);
        }
        category = [];
    }

}
export default Pollution