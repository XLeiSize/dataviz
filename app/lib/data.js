import emitter from './event-emitter';

class Data {
	constructor(options){
		this.parcs = [];
		this.coords = [];
		this.coordsXY = [];
		this.surfaces = [];
		this.contents = [];
		this.getData();
		this.width = options.width;
		this.height = options.height;
		emitter.on('dataLoaded', function(){
			this.calcSize();
		}.bind(this));
	}

	getData(){
		var req = new XMLHttpRequest();
		req.open("GET", '../data.json', true);
		req.onreadystatechange = function(){
			if(req.readyState == 4){
				var data = JSON.parse(req.responseText);

				data.sort(function(a, b) {
				    return b.fields.surface_to - a.fields.surface_to;
				});

				console.log(data);

				var somme =0;

				for(var i = 0; i < data.length; i++){

					this.parcs.push(data[i].fields);
					let coords = data[i].fields.geom_x_y;
					let fields = data[i].fields;

					somme += fields.surface_to;
					
					if(data[i].fields.surface_to >=20000){
						this.coords.push({
									x:coords[1],
									y:coords[0]
								});
						this.surfaces.push(fields.surface_to);
						
						this.contents.push({
							name: fields.nom_ev,
							adresse: fields.adresse_nu + " " + fields.adresse + ", " + fields.ardt,
							surface: fields.surface_to
						})
					}
				}
				// this.distance(this.coords[2].y, this.coords[2].x);
				for(var i = 0; i < this.coords.length; i++){
					let coords = this.coords[i];
					this.coordsXY.push({
								x:this.calcCoordX(coords.x),
								y:this.calcCoordY(coords.y)
								});
				}

				console.log(somme);
				emitter.emit('dataLoaded');
	
			}
		}.bind(this);
		req.send(null);
	}

	getCoords(i){
		console.log(this.coordsXY[i]);
		return this.coordsXY[i];


	}

	distance(lat2, lon2){
		var lat1 = 48.899528;
		var lon1 = 2.231335;
		var R = 6371; // km
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon1) * Math.PI / 180;
		var lat1 = lat1 * Math.PI / 180;
		var lat2 = lat2 * Math.PI / 180;

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		console.log(d);
	}

	calcCoordX(lon2){
		var R = 6371;
		var lonOrigin = 2.231335;
		var dLon = (lon2-lonOrigin)*R ;
		return dLon;

	}
	calcCoordY(lat2){
		var R = 6371;
		var latOrigin = 48.899528;
		var dLat = (latOrigin-lat2)*R;
		return dLat;

	}

	calcSize(){
		let surfaces =  this.surfaces;
		let max = Math.max.apply(null, surfaces);
		for(let i = 0; i < surfaces.length; i++){
			let size = Math.round( surfaces[i]/max * 10) / 10;
			if(size < 0.3){
				size = 0.3;	
			} else if(size > 0.3 && size < 0.4){
				size = 0.4;	
			} else if(size > 0.4 && size < 0.5){
				size = 0.5;	
			} else if(size > 0.5 && size < 0.6){
				size = 0.6;	
			}
			else if(size > 0.6 && size < 0.7){
				size = 0.6;	
			}
			surfaces[i] = size;
		}
		
	}
	
}

export default Data;
