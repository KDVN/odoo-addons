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
    	className: 'oe_petstore_homepage',

    	start: function() {
    		this.colorInput = new local.ColorInputWidget(this);
    		this.colorInput.on("change:color", this, this.color_changed);
    		this.colorInput.appendTo(this.$el);
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
}
