function DivisionResizable(parent)
{
	//Parent
	if(parent === undefined)
	{
		this.parent = document.body;
	}
	else
	{
		this.parent = parent;
	}

	//ID
	var id = "div_res" + DivisionResizable.id;
	var id_tab = "div_res_tab" + DivisionResizable.id;
	DivisionResizable.id++;

	//Create element
	this.element = document.createElement("div");
	this.element.id = id;
	this.element.style.position = "absolute";
	this.element.className = "panel";

	//Create resize_tab tab
	this.resize_tab = document.createElement("div");
	this.resize_tab.id = id_tab;
	this.resize_tab.style.position = "absolute";
	this.resize_tab.className = "panel_res_hor_tab";

	//Element atributes
	this.size = new THREE.Vector2(0,0);
	this.position = new THREE.Vector2(0,0);
	this.visible = true;
	this.resize_tab_size = 5;
	this.resizable_side = DivisionResizable.LEFT;
	this.resizing = false;

	//On mouse move event
	var self = this;
	this.resize_tab.onmousemove = function(event)
	{
		if(Mouse.buttonPressed(Mouse.LEFT))
		{
			self.resizing = true;
		}
	};
	
	//Update element
	this.updateInterface();

	//Add element to document
	this.parent.appendChild(this.element);
	this.parent.appendChild(this.resize_tab);
}

//DivisionResizable conter
DivisionResizable.id = 0;

//Resizable side
DivisionResizable.LEFT = 0;
DivisionResizable.RIGHT = 1;
DivisionResizable.TOP = 2;
DivisionResizable.BOTTOM = 3;

//Functions Prototype
DivisionResizable.prototype.update = update;
DivisionResizable.prototype.updateInterface = updateInterface;
DivisionResizable.prototype.destroy = destroy;

//Remove element
function destroy()
{
	this.parent.removeChild(this.resize_tab);
	this.parent.removeChild(this.element);
}

//Update status
function update()
{
	if(this.resizing && Mouse.buttonPressed(Mouse.LEFT))
	{
		if(this.resizable_side == DivisionResizable.LEFT)
		{	
			this.size.x -= Mouse.pos_diff.x;
		}
		else if(this.resizable_side == DivisionResizable.RIGHT)
		{
			this.size.x += Mouse.pos_diff.x;
		}
		else if(this.resizable_side == DivisionResizable.TOP)
		{
			this.size.y -= Mouse.pos_diff.y;
		}
		else if(this.resizable_side == DivisionResizable.BOTTOM)
		{
			this.size.y += Mouse.pos_diff.y;
		}

		//Limit Size
		if(this.size.x < this.resize_tab_size)
		{
			this.size.x = this.resize_tab_size;
		}
		if(this.size.y < this.resize_tab_size)
		{
			this.size.y = this.resize_tab_size;
		}

		//Update Parent interface
		EditorUI.updateInterface();
	}
	else
	{
		this.resizing = false;
	}
}

//Update DivisionResizable Size
function updateInterface()
{
	if(this.visible)
	{
		this.resize_tab.style.visibility = "visible";
		this.element.style.visibility = "visible";
	}
	else
	{
		this.resize_tab.style.visibility = "hidden";
		this.element.style.visibility = "hidden";
	}

	if(this.resizable_side == DivisionResizable.LEFT)
	{	
		this.resize_tab.className = "panel_res_hor_tab";

		this.resize_tab.style.top = this.position.y + "px";
		this.resize_tab.style.left = this.position.x + "px";
		this.resize_tab.style.width = this.resize_tab_size + "px";
		this.resize_tab.style.height = this.size.y + "px";

		this.element.style.top = this.position.y + "px";
		this.element.style.left = (this.position.x + this.resize_tab_size) + "px";
		this.element.style.width = (this.size.x - this.resize_tab_size) + "px";
		this.element.style.height = this.size.y + "px";
	}
	else if(this.resizable_side == DivisionResizable.RIGHT)
	{	
		this.resize_tab.className = "panel_res_hor_tab";

		this.resize_tab.style.top = this.position.y + "px";
		this.resize_tab.style.left = (this.position.x + (this.size.x - this.resize_tab_size))+ "px";
		this.resize_tab.style.width = this.resize_tab_size + "px";
		this.resize_tab.style.height = this.size.y + "px";

		this.element.style.top = this.position.y + "px";
		this.element.style.left = this.position.x + "px";
		this.element.style.width = (this.size.x - this.resize_tab_size) + "px";
		this.element.style.height = this.size.y + "px";
	}
	else if(this.resizable_side == DivisionResizable.TOP)
	{
		this.resize_tab.className = "panel_res_ver_tab";

		this.resize_tab.style.top = this.position.y + "px";
		this.resize_tab.style.left = this.position.x + "px";
		this.resize_tab.style.width = this.size.x + "px";
		this.resize_tab.style.height = this.resize_tab_size + "px";

		this.element.style.top = (this.position.y + this.resize_tab_size) + "px";
		this.element.style.left = this.position.x + "px";
		this.element.style.width = this.size.x + "px";
		this.element.style.height = (this.size.y - this.resize_tab_size) + "px";
	}
	else if(this.resizable_side == DivisionResizable.BOTTOM)
	{
		this.resize_tab.className = "panel_res_ver_tab";

		this.resize_tab.style.top = (this.position.y + (this.size.y - this.resize_tab_size)) + "px";
		this.resize_tab.style.left = this.position.x + "px";
		this.resize_tab.style.width = this.size.x + "px";
		this.resize_tab.style.height = this.resize_tab_size + "px";

		this.element.style.top = this.position.y + "px";
		this.element.style.left = this.position.x + "px";
		this.element.style.width = this.size.x + "px";
		this.element.style.height = (this.size.y - this.resize_tab_size) + "px";
	}
}