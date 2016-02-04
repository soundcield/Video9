HttpCom.extensions.imagePreview = function(scope) {	
	var xOffset = -200,
		yOffset = 350;

	$('img.preview').hover(function(e){
		this.a = this.alt;
		//this.alt = '';
		this.t = this.title;
		//this.title = '';
        
		/*if ($('#image-preview img').attr('src') !== this.a) {
            
			$('#image-preview').remove();
		}*/
        
		$('body').append('<p id="image-preview"><img src="'+ this.a +'" alt="Image preview" />' + (this.t ? ('<br />' + this.t) : '') + '</p>');								 
		$('#image-preview').css({
			top: (e.pageY - yOffset) + 'px',
			left:(e.pageX + xOffset) + 'px'
		})
		.fadeIn('fast');						
    },
	function(){
		//this.alt = this.a;	
        //$('#image-preview').hide();
		$('#image-preview').remove();
    });
    	
	$('img.preview').mousemove(function(e){
		$('#image-preview').css({
			top: (e.pageY - yOffset) + 'px',
			left: (e.pageX + xOffset) + 'px'
		});
	});			
};


HttpCom.extensions.imageReplace = function(scope) {      
    

var $img = $('img.replace'); 
$img.bind('click',function(){
   
img400_300 = this.alt;   
/* $('#image-to-replace').hide().load(function () {
      $(this).fadeIn();
}).attr('src',img400_300)*/;

$("#image-to-replace").attr("src",img400_300);

return false; 
});
    
    
    
}