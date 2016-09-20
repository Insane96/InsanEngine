var Game = {
	deltaTime: 0,
	oldTime: 0,
	timeScale: 1.0,
	loaded: false,
	volume: 1.0,
	GameLoop: function(){
		//DeltaTime
		currentTime = new Date().getTime();
		Game.deltaTime = (currentTime - (Game.oldTime || currentTime)) / 1000 * Game.timeScale;
		Game.oldTime = currentTime;
		document.head.getElementsByTagName("title")[0].innerHTML = "InsanEngine (" + Math.round(1 / Game.deltaTime * Game.timeScale) + ")";
		if (Game.deltaTime > 1)
			Game.deltaTime = 1 / 60;
		
		//Canvas Size
		if (resizeCanvas){
			Game.canvas.style.width = (innerWidth - 4) + "px";
				Game.canvas.style.height = "";
			if (Game.canvas.getBoundingClientRect().height > innerHeight){
				Game.canvas.style.height = (innerHeight - 4) + "px";
				Game.canvas.style.width = "";
			}
		}
		//canvasScale
		Game.canvas.scale = canvasWidth / Game.canvas.getBoundingClientRect().width;
		
		//If the game isn't Paused
		if (!Game.paused){
			Game.Update();
		}
		Game.Draw();
		
		//Input Down and Up reset
		for (var i = 0; i < 128; i++){
			Input.keyDown[i] = false;
			Input.keyUp[i] = false;
		}
		Input.mouseDownLeft = false;
		Input.mouseUpLeft = false;
		Input.mouseDownRight = false;
		Input.mouseUpRight = false;
		Input.mouseDownMiddle = false;
		Input.mouseUpMiddle = false;
		
		//Loop
		window.requestAnimFrame(function(){
			Game.GameLoop();
		});
	},
	
	paused: false,
	
	gameObjects: [],
	
	layers: new Array(31),
	layersName: [],
	
	LayerToName: function(layer){
		return Game.layersName[layer];
	},
	
	NameToLayer: function(name){
		for (var i = 0; i < Game.layersName.length; i++){
			if (Game.layersName[i] == name)
				return i;
		}
		console.Warning("Failed to retrieve layer " + name);
	},
	
	GetLayer: function(layer){
		return Game.layers[layer];
	},
	
	audio: [],
	
	textures: [],
	texturesLoaded: 0,
	texturesToLoad: 0,
	
	Update: function(){
		for (var i = 0; i < Game.gameObjects.length; i++){
			Game.gameObjects[i].Update();
		}
	},
	
	Draw: function(){
		if (this.texturesLoaded == this.texturesToLoad){
			Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
			for (var i = 0; i < Game.gameObjects.length; i++){
				Game.gameObjects[i].Draw();
			}
		}
	},

	AddGameObject: function(gameObject){
		for (var i = 0; i < Game.gameObjects.length; i++)
			if (Game.gameObjects[i] == gameObject){
				console.Warning("gameObject already exist in Game");
				return;
			}
		Game.gameObjects.push(gameObject);
		gameObject.Start();
	},
	
	RemoveGameObject: function(gameObject){
		for (var i = 0; i < Game.gameObjects.length; i++)
			if (Game.gameObjects[i] == gameObject){
				Game.gameObjects.splice(i, 1);
				return;
			}
		console.Warning("Failed to remove gameObject");
	},
	
	AddTexture: function(texture){
		for (var i = 0; i < Game.textures.length; i++){
			if (Game.textures[i] == texture){
				console.Warning("Texture already in textures list");
				return;
			}
		}
		Game.textures.push(texture);
	},
	
	RemoveTexture: function(name){
		for (var i = 0; i < Game.textures.length; i++){
			if (Game.textures[i].name == name){
				Game.textures.splice(i, 1);
				return;
			}
		}
		console.Warning("Failed to remove texture " + name);
	},
	
	GetTexture: function(name){
		for (var i = 0; i < Game.textures.length; i++){
			if (Game.textures[i].name == name){
				return Game.textures[i];
			}
		}
		console.Warning("Failed to retrieve texture " + name);
	},
}
for (var i = 0; i < Game.layers.length; i++){
	Game.layers[i] = [];
}

function Init(){
	if (noBodyMargin)
		document.body.style.margin = "0px";
	document.body.innerHTML += "<canvas id=\"game\" width=" + canvasWidth + " height=" + canvasHeight + "></canvas>";
	Game.canvas = document.getElementById("game");
	Game.canvas.style.border = "solid " + canvasBorderColor + " " + canvasBorderSize + "px";
	Game.canvas.style.display = "block";
	Game.canvas.style.margin = "auto";
	if (!cursorVisible)
		Game.canvas.style.cursor = "none";
	Game.ctx = Game.canvas.getContext("2d");
	
	if (!Game.ctx)
		alert("Your browser seems to not support HTML5, please, switch to a newer browser");
	
	InitGame();
	Game.GameLoop();
	Game.loaded = true;
}

function GameObject(){
	this.position = new Vector2(0, 0);
	Object.defineProperty(this, "centerPosition", {
		get: function(){
			return new Vector2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
		}
	});
	this.canCollide = true;
	this.canCollideWhileInvisible = false;
	this.tags = [];
	var layer = -1;
	Object.defineProperty(this, "layer", {
		get: function(){
			return layer;
		},
		set: function(value){
			if (layers =! -1)
			for (var i = 0; i < Game.layers[layer].length; i++){
				if (Game.layers[layer][i] == this){
					Game.layers[layer].splice(i, 1);
					break;
				}
			}
			layer = value;
			Game.layers[layer].push(this);
		},
	});
	
	this.Start = function(){
		
	}
	
	this.Update = function(){
		
	}
	
	this.Draw = function(){
		
	}
	
	this.OnCollisionEnter = function(){
		
	}
	
	this.AddTag = function(tag){
		this.tags.push(tag);
	}
	
	this.RemoveTag = function(tag){
		for (var i = 0; i < this.tags.length; i++){
			if (this.tags[i] == tag)
				this.tags[i].splice(i, 1);
		}
	}
}

function Clickable(){
	this.onHold = function(btn){
		switch (btn){
			case Input.MOUSE_LEFT:
				return Sprite.MouseInsideBoundaries(this, Input.mouseLeft);
			break;
			case Input.MOUSE_MIDDLE:
				return Sprite.MouseInsideBoundaries(this, Input.mouseMiddle);
			break;
			case Input.MOUSE_RIGHT:
				return Sprite.MouseInsideBoundaries(this, Input.mouseRight);
			break;
		}
	}
	
	this.onClick = function(btn){
		switch (btn){
			case Input.MOUSE_LEFT:
				return Sprite.MouseInsideBoundaries(this, Input.mouseDownLeft);
			break;
			case Input.MOUSE_MIDDLE:
				return Sprite.MouseInsideBoundaries(this, Input.mouseDownMiddle);
			break;
			case Input.MOUSE_RIGHT:
				return Sprite.MouseInsideBoundaries(this, Input.mouseDownRight);
			break;
		}
	}
	
	this.onRelease = function(btn){
		switch (btn){
			case Input.MOUSE_LEFT:
				return Sprite.MouseInsideBoundaries(this, Input.mouseUpLeft);
			break;
			case Input.MOUSE_MIDDLE:
				return Sprite.MouseInsideBoundaries(this, Input.mouseUpMiddle);
			break;
			case Input.MOUSE_RIGHT:
				return Sprite.MouseInsideBoundaries(this, Input.mouseUpRight);
			break;
		}
	}
	
	this.OnHover = function(){
		return Sprite.MouseInsideBoundaries(this);
	}
}

Clickable.MouseInsideBoundaries = function(rect, inputMouse){
	if ((inputMouse || inputMouse === undefined) && Input.mouseX >= rect.position.x && Input.mouseX <= (rect.position.x + rect.size.x) && Input.mouseY >= rect.position.y && Input.mouseY <= (rect.position.y + rect.size.y))
		return true;
	return false;
}

function Sprite(x, y, texture, scale, w, h, rotation){
	if (arguments.length < 3 || arguments.length > 7)
		throw "Error: Sprite constructor requires minimum 3 arguments and a maximum of 7\nArguments: " + arguments.length;
	GameObject.apply(this);
	Clickable.apply(this);
	this.position = new Vector2(x, y);
	this.texture = texture;
	this.scale = (typeof scale === "undefined") ? 1 : scale;
	this.unscaledSize = (typeof w === "undefined") ? new Vector2(texture.width, texture.height) : new Vector2(w, h);
	this.size = new Vector2(this.unscaledSize.x * this.scale, this.unscaledSize.y * this.scale);
	this.rotation = (typeof rotation === "undefined") ? 0 : rotation;
	this.visible = true;
	this.Draw = function(){
		if (this.visible){
			if (this.rotation != 0){
				tx = this.position.x + this.size.x / 2;
				ty = this.position.y + this.size.y / 2;
				Game.ctx.save();
				Game.ctx.translate(tx, ty);
				Game.ctx.rotate(Math.DegrToRad(this.rotation));
				this.size = new Vector2(this.unscaledSize.x * this.scale, this.unscaledSize.y * this.scale);
				Game.ctx.drawImage(texture.image, -this.size.x / 2, -this.size.x / 2, this.size.x, this.size.y);
				Game.ctx.restore();
			}
			else
				Game.ctx.drawImage(texture.image, this.position.x, this.position.y, this.size.x, this.size.y);
		}
	}
	
	this.OnCollisionEnter = function(){
		var collisions = [];
		for (var i = 0; i < Game.gameObjects.length; i++){
			gameObject = Game.gameObjects[i];
			if ((!gameObject.canCollide) || (!gameObject.visible && !gameObject.canCollideWhileInvisible) || (this == gameObject))
				continue;
			if (this.position.x + this.size.x >= gameObject.position.x &&
				this.position.x <= gameObject.position.x + gameObject.size.x &&
				this.position.y + this.size.y >= gameObject.position.y &&
				this.position.y <= gameObject.position.y + gameObject.size.y){
				collisions.push(gameObject);
			}
		}
		return collisions;
	}
}

function r9(){
	return Math.floor(Math.random() * 1000000000).toString(16);
}

function Texture(url, name){
	if (arguments.length < 1 || arguments.length > 2)
		throw "Error: Texture constructor requires minimum 1 arguments and a maximum of 2\nArguments: " + arguments.length;
	this.image = new Image();
	this.image.src = url;
	if (name === undefined)
		this.name = r9() + "-" + r9() + "-" + r9();
	else
		this.name = name;
	Game.texturesToLoad++;
	self = this;
	this.imageOnLoad = function(){
		this.width = this.image.width;
		this.height = this.image.height;
		Game.AddTexture(this);
		Game.texturesLoaded++;
	}
	this.image.onload = this.imageOnLoad.bind(this);
}

function Text(x, y, txt, fontSize, fontType, isFilled){
	if (arguments.length < 2 || arguments.length > 6)
		throw "Error: Text constructor requires minimum 2 arguments and a maximum of 6\nArguments: " + arguments.length;
	GameObject.apply(this);
	this.position = new Vector2(x, y);
	this.fontSize = (typeof fontSize === "undefined") ? 32 : fontSize;
	this.fontType = (typeof fontType === "undefined") ? "serif" : fontType;
	this.isFilled = (typeof isFilled === "undefined") ? true : isFilled;
	this.width = 0;
	this.height = 0;
	this.txt = (typeof txt === "undefined") ? "John Cena" : txt;
	this.visible = true;
	this.Draw = function(){
		if (this.visible){
			Game.ctx.font = this.fontSize + "px " + this.fontType;
			this.width = Game.ctx.measureText(this.txt).width;
			this.height = Game.ctx.measureText(this.txt).height;
			if (this.isFilled)
				Game.ctx.fillText(this.txt, this.position.x, this.position.y);
			else
				Game.ctx.strokeText(this.txt, this.position.x, this.position.y);
		}
	}
}


/* function Line(sx, sy, ex, ey){
	if (arguments.length != 4)
		throw "Error: Line constructor requires 4 arguments\nArguments: " + arguments.length;
	GameObject.apply(this);
	this.startposition = new Vector2(sx, sy);
	this.endPosition = new Vector2(ex, ey);
	this.visible = true;
	this.Draw = function(){
		if (this.visible){
			Game.ctx.beginPath();
			Game.ctx.moveTo(this.startposition.x, this.startposition.y);
			Game.ctx.lineTo(this.endPosition.x, this.endPosition.y);
			Game.ctx.stroke();
		}
	}
}
 */


function SimpleShape(x, y){
	if (arguments.length != 2)
		throw "Error: SimpleShape constructor requires 2 arguments\nArguments: " + arguments.length;
	GameObject.apply(this);
	this.position = new Vector2(x, y);
	this.isFilled = true;
	this.color = "#000";
}

function Rectangle(x, y, w, h){
	if (arguments.length != 4)
		throw "Error: Rectangle constructor requires 4 arguments\nArguments: " + arguments.length;
	SimpleShape.apply(this, [x, y]);
	Clickable.apply(this);
	this.position = new Vector2(x, y);
	this.size = new Vector2(w, h);
	this.visible = true;
	this.Draw = function(){
		if (this.visible){
			if (this.isFilled){
				Game.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
				Game.ctx.fillStyle = this.color;
			}
			else{
				Game.ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
				Game.ctx.strokeStyle = this.color;
			}
		}
	}
}
Rectangle.MouseInsideBoundaries = function(rect, inputMouse){
	if ((inputMouse || inputMouse === undefined) && Input.mouseX >= rect.position.x && Input.mouseX <= (rect.position.x + rect.size.x) &&
		Input.mouseY >= rect.position.y && Input.mouseY <= (rect.position.y + rect.size.y))
		return true;
	return false;
}


function Circle(x, y, r){
	if (arguments.length != 3)
		throw "Error: Circle constructor requires 3 arguments\nArguments: " + arguments.length;
	SimpleShape.apply(this, [x, y]);
	this.position = new Vector2(x, y);
	this.radius = r;
	this.visible = true;
	this.Draw = function(){
		if (this.visible){
			dx = this.position.x + this.radius;
			dy = this.position.y + this.radius;
			
			if (this.isFilled){
				Game.ctx.beginPath();
				Game.ctx.fillStyle = this.color;
				Game.ctx.arc(dx, dy, this.radius, 0, (Math.PI * 2));
				Game.ctx.fill();
			}
			else{
				Game.ctx.beginPath();
				Game.ctx.strokeStyle = this.color;
				Game.ctx.arc(dx, dy, this.radius, 0, (Math.PI * 2));
				Game.ctx.stroke();
			}
			Game.ctx.fillStyle = "#000";
			Game.ctx.strokeStyle = "#000";
		}
	}
}

function Sound(url, volume, playOnLoad){
	if (arguments.length < 1 || arguments.length > 3)
		throw "Error: Sound constructor requires minimum 1 argument and a maximum 3\nArguments: " + arguments.length;
	this.audio = new Audio(url);
	this.volume = (typeof volume === "undefined") ? 1.0 : volume;
	this.audio.autoplay = (typeof playOnLoad === "undefined") ? false : playOnLoad;
	this.audio.volume = this.volume;
	this.Play = function(){
		this.audio.volume = this.volume * Game.volume;
		this.audio.currentTime = 0;
		this.audio.play();
	}
}

window.requestAnimFrame = (function(callback) {
 
    return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		}; 
})();

window.addEventListener("load", function(){
	Init();
}, false);