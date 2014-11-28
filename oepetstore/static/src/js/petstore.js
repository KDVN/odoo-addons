openerp.oepetstore = function(instance, local) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;
    
    local.ColorInputWidget = instance.Widget.extend({
    	template: "ColorInputWidget",
    	events: {
    		'change input': 'input_changed',
    	},
    	start: function(){
    		this.input_changed();
    	},
    	input_changed: function(){
    		var color = [
    		             "#",
    		             this.$(".oe_color_red").val(),
    		             this.$(".oe_color_green").val(),
    		             this.$(".oe_color_blue").val(),
    		             ].join('');
    		this.set("color", color);
    	},
    });

    local.GreetingsWidget = instance.Widget.extend({
    	className: 'oe_petstore_greetings',
    	start: function() {
    		this.$el.append("<div>We are so happy to see you again in this menu!</div>");
    		console.log(this.getParent().$el);
    	},
    });
    
    local.HomePage = instance.Widget.extend({
    	template: "HomePage",
    	//className: 'oe_petstore_homepage',

    	start: function() {
    		return $.when(
    				new local.PetToysList(this).appendTo(this.$('.oe_petstore_homepage_left')),
    				new local.MessageOfTheDay(this).appendTo(this.$('.oe_petstore_homepage_right'))
    				); 
    		
    		//var self = this;
    		//var model = new instance.web.Model("oepetstore.message_of_the_day");
    		//model.call("my_method", {context: new instance.web.CompoundContext()}).then(function(result){
    		//	self.$el.append("<div>Hello " + result["hello"] + "</div>")
    		//});
    		//this.colorInput = new local.ColorInputWidget(this);
    		//this.colorInput.on("change:color", this, this.color_changed);
    		//this.colorInput.appendTo(this.$el);
    		//var products = new local.ProductsWidget(
    		//		this, ["cpu", "mouse", "keyboard", "graphic card", "screen"], "#00FF00");
    		//products.appendTo(this.$el);
        	//var greeting = new local.GreetingsWidget(this);
        	//return greeting.appendTo(this.$el);
        },
        
        color_changed: function(){
        	this.$(".oe_color_div").css("background-color", this.colorInput.get("color"));
        },
    });
    
    local.ProductsWidget = instance.Widget.extend({
    	template: "ProductsWidget",
    	events: {
    		'click': function(e){console.log("widget click!")},
    	},
    	init: function(parent, products, color){
    		this._super(parent);
    		this.products = products;
    		this.color = color;
    	},
    });

    instance.web.client_actions.add('petstore.homepage', 'instance.oepetstore.HomePage');
    
    local.MessageOfTheDay = instance.Widget.extend({
    	template: "MessageOfTheDay",
    	start: function(){
    		var self = this;
    		return new instance.web.Model("oepetstore.message_of_the_day")
    			.query(["message"])
    			.order_by('-create_date', '-id')
    			.first()
    			.then(function(result){
    				self.$(".oe_mywidget_message_of_the_day").text(result.message)
    			});
    	},
    });
    
    local.PetToysList = instance.Widget.extend({
    	template: "PetToysList",
    	start: function(){
    		var self = this;
    		return new instance.web.Model("product.product")
    			.query(['name', 'image'])
    			.filter([['categ_id.name', '=', "Pet Toys"]])
    			.limit(5)
    			.all()
    			.then(function(result){
    				for (var i=0; i<result.length; i++){
    					item = result[i];
        				//console.log(item);
        				//console.log(item.image);
        				//console.log(item.name);
        				self.$el.append(QWeb.render('PetToy', {item: item}));
    				};
    				
    			});
    	},
    });
}
