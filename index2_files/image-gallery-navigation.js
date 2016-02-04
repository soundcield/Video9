HttpCom.extensions.imageGalleryNavigation = function(scope) {     
    
    
       
          if($("#image-gallery-3").length > 0) {
              clase = '#image-gallery-3';
          }
          else  if($("#image-gallery-5").length > 0) {
              clase = '#image-gallery-5';
          }
          else if ($("#resources-4").length > 0){
              clase = '#resources-4';
         }
         
         if(typeof clase != 'undefined'){
          numItems = clase.charAt(clase.length-1);   
          $imageList  = $(clase + " li");
          totalLi = $imageList.length;
          if(totalLi > numItems){
            for(var i = numItems ; i <= totalLi ; i++){
             $imageList.eq(i).hide();    
            }
          }             
        
         $("div.buttons-gallery .next").click(function(){
        
          $visibleList = $(clase+ " li:visible");          
          $visibleLast = $visibleList.last();          
          $visibleFirst = $visibleList.first();          
        
          if($visibleLast.next().length == 1){
             $visibleFirst.hide();   
            $visibleLast.next().fadeIn('slow');
          }          
        return false;
        
        });
       
        $("div.buttons-gallery .back").click(function(){
        
          $visibleList = $(clase + " li:visible");          
          $visibleLast = $visibleList.last();          
          $visibleFirst = $visibleList.first();          
         
         if($visibleFirst.prev().length == 1){ 
           $visibleFirst.prev().fadeIn("slow");
           $visibleLast.hide();          
         }
         return false;
         
        });  
    }
}