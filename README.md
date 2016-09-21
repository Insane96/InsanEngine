# InsanEngine
A Javascript Engine using Canvas


##Changelog  

	# 21/9/2016 12:20 #
		Fixed #3

	# 20/9/2016 15PM #
		Added resizeCanvas in config  
		Fixed #1 and #2  

    # 20/9/2016 11:51 #  
	    Added Layer system, with Game.LayerToName(layer), Game.NameToLayer(name) and Game.GetLayer(layer)  
		    You can set the layer of a gameObject with GameObject.layer = layerNumber;  
		    In config.js you can config the layer names, up to 31 names, defaults to ["player", "enemy"]  
		    Layer -1 for game objects, means no layer  
  	    Added centerPosition property for every game object  
  		    returns the center position of the game object (Vector2(x + width / 2, y + height / 2))  
    	Added config.js for some configurations  
     	Renamed scaledSize in size and size in unscaledSize
