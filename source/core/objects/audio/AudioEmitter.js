"use strict";

function AudioEmitter(audio)
{
	THREE.Audio.call(this, AudioEmitter.listener);

	this.name = "audio";
	this.type = "Audio";

	this.audio = (audio !== undefined) ? audio : null;

	this.autoplay = true;
	this.playbackRate = 1;
	this.startTime = 0;
	this.source.loop = true;
}

//Default audio listener
AudioEmitter.listener = new THREE.AudioListener();

//Super prototypes
AudioEmitter.prototype = Object.create(THREE.Audio.prototype);

//Initialize audio object
AudioEmitter.prototype.initialize = function()
{
	var self = this;

	if(this.audio !== null)
	{
		THREE.AudioContext.decodeAudioData(this.audio.data, function(buffer)
		{
			self.setBuffer(buffer);
		});
	}

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].initialize();
	}
}

//Dispose audio object
AudioEmitter.prototype.dispose = function()
{
	if(this.isPlaying)
	{
		this.stop();
		this.disconnect();
	}

	for(var i = 0; i < this.children.length; i++)
	{
		this.children[i].dispose();
	}
}

//Create JSON description
AudioEmitter.prototype.toJSON = function(meta)
{
	var audio = this.audio;
	var data = THREE.Object3D.prototype.toJSON.call(this, meta, function(meta, object)
	{
		audio = audio.toJSON(meta);
	});

	data.object.audio = audio.uuid;	
	data.object.autoplay = this.autoplay;
	data.object.startTime = this.startTime;
	data.object.playbackRate = this.playbackRate;

	data.object.source = {};
	data.object.source.loop = this.source.loop;

	return data;
}