AFRAME.registerComponent('rotating-camera', {
  schema: {
    target: {type: 'selector'}
  },
	
  tick: function () {
	var currentRotation = this.el.object3D.rotation;
	var targetRotation = this.data.target.object3D.rotation;
	
	this.el.setAttribute('rotation', {
      x: -90,
      y: THREE.Math.radToDeg(targetRotation.y),
      z: 0,
    });
  }
});

AFRAME.registerComponent('virus', {	
  
    init: function () {
		
		var anim = this.el
		anim.addEventListener('animationcomplete__explosion', function () {
			console.log("virus destroyed")
			
			let pool = anim.sceneEl.components["pool__virus"];
			pool.returnEntity(anim);
		});
		
		
		/*var currentScale= this.el.object3D.scale;
		
		if (currentScale.x < 0.01) {
			console.log("virus destroyed")
			
			let pool = this.el.sceneEl.components["pool__virus"];
			pool.returnEntity(this.el)
		}*/
	}

});


AFRAME.registerComponent('virus_spawner', {	
  schema: {
	minDist: {type: 'float', default: 3},
	maxDist: {type: 'float', default: 4}
  },
  
  
  tick: function () {
	
	var el = this.el;
	let pool = this.el.sceneEl.components["pool__virus"];
	count = pool.availableEls.length;
	
	let min = this.data.minDist
	let max = this.data.maxDist
	
	for (i = 0; i < count; i++) {
		var virusEl = pool.requestEntity();
		if (!virusEl) { return; }
	
		
		x = (Math.random() * 2 - 1);
		y = Math.random();
		z = (Math.random() * 2 - 1);
		
		r = Math.sqrt(x * x + y * y + z * z) * 0.5;
		rand_r = Math.random() * (max - min) + min;
		
		x = x / r * rand_r
		y = y / r * rand_r
		z = z / r * rand_r
		
		virusEl.object3D.position.set(x, y, z);
		//console.log(x, y, z);
		
		virusEl.play();
		
		virusEl.emit('birth');
	}
  },
  

});