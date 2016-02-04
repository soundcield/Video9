/*
* FeedEk jQuery RSS/ATOM Feed Plugin 
* http://jquery-plugins.net/FeedEk/FeedEk.html
* Author : Engin KIZIL
* http://www.enginkizil.com
*/

(function($) {
	$.fn.FeedEk = function(opt) {
		var def = {
				FeedUrl : 'http://rss.cnn.com/rss/edition.rss',
				MaxCount : 5,
				ShowDesc : true,
                ShowPubDate : true,
                TitleLink: true,
                PostTitle: true,
                Date: false,
                Link: true,
                ReadMore: 'Read more...'
            };
		
            if (opt) {
                  $.extend(def, opt)
            }
            //var idd = $(this).attr('id');
			var idd = 'rss';
            var pubdt;
            
            $.ajax({
            	url : 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='
                        + def.MaxCount
                        + '&output=json&q='
                        + encodeURIComponent(def.FeedUrl) + '&callback=?',
                dataType : 'json',
                success : function(data) {
                	$.each(data.responseData.feed.entries, function(i,entry) {
                		//if post title is true then display the feed title
                		if (def.PostTitle == true) {
                			//if the title link is true then link it to the respective feed else display just title without link
							if (def.TitleLink == true){
	                			$('.' + idd).append('<h3><a href="'+ entry.link+ '" target="_blank" >'+ entry.title + '</a></h3>');
	                		}else{
	                			$('.' + idd).append('<h3>'+ entry.title + '</h3>');
	                		}
						}else{
							$('.' + idd).append('<h3></h3>');
						}
                		
                		
                		if (def.ShowPubDate != false) {
                			pubdt = new Date(entry.publishedDate);
                			$('.' + idd).append('<div class="meta">'+ pubdt.toLocaleDateString()+ '</div>')
                        }
                		
                        if (def.ShowDesc == true){
                        	var rss_content = '';
                        	if (def.Link == true) {
								rss_content = '<div class="RSSPost">'+ entry.content + '<a href="'+ entry.link +'" target="_blank" class="read_more">'+def.ReadMore+'...</a></div>';
							} else {
								rss_content = '<div class="RSSPost">'+ entry.content + '</div>';
							}
                        	$('.' + idd).append(rss_content);
                        }else{
                        	$('.' + idd).append('<div class="RSSPost"></div>');
                        }
                        	
                    })
                }
           })
      }
})(jQuery);
