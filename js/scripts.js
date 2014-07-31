	$( document ).ready(function() {
	
		$("#horde").fadeIn(3000);
		$('a').click(function(){
			$("html, body").animate({
				scrollTop: $( $.attr(this, "href") ).offset().top
			}, 500);
			return false;
		}); 

		$(window).scroll(function () {
			if ($("#jqNavBar").offset().top > 990){
				$("#jqNavBar").css("inherit");
				$('.navbar').fadeIn();
			}  else {
				$("#jqNavBar").css("none");
				$('.navbar').fadeOut();			
			}
		});
		
		

		
		
		
		// Constructor:
		var Streamer = function(username){
		   this.username = username;
		}
		   
		Streamer.prototype.getPlayerInfo = function(callback){
			$.get("https://api.twitch.tv/kraken/search/streams?q="+this.username, callback,"jsonp");
		}

		  
		var playerList = ["Towelliee", "Dillypoo69", "Swifty", "NarixxP", "Spartysmallwood", "Slootbag", "Pooksie", "Killars", "NCPricket", "LengendaryLea", "Ducksauce", "AbsalomBL", "DevHi", "Fragnance", "FatbossTV"];
		
		playerList.sort().reverse();

		$.each(playerList, function(item){
		
			var player = playerList[item];
			
			var d = new Streamer(player);
			
			d.getPlayerInfo(function(data){
					
					var onlineStatus = data._total;
					
						
					 var postsHTML = "";
				 
					 postsHTML += postTemplate(data);
					 $("#streamersFont").append(postsHTML);
					
					function postTemplate(post){

						if ( onlineStatus > 0){
						
							var streamUrl = data.streams[0].channel.url;
							var viewers = data.streams[0].viewers;
							var streamStatus = data.streams[0].channel.status;

							//console.log(player);
							//console.log(onlineStatus);
							//console.log(streamUrl);
							//console.log(viewers);
						
							var html = "<a href='http://www.twitch.tv/"+player+"' class='stream_row'>";
								html += 	"<span class='stream_status online'>Online</span>";
								html += 	"<span class='stream_user'>"+player+"</span>";
								html += 	"<span class='stream_description'>"+streamStatus+"</span>";
								html += 	"<span class='stream_viewers'>"+viewers+"</span>";
								html += "</a>";
						}else{
							
							var html = "<a href='http://www.twitch.tv/"+player+"' class='stream_row'>";
								html += 	"<span class='stream_status offline'>Offline</span>";
								html += 	"<span class='stream_user'>"+player+"</span>";
								html += 	"<span class='stream_description'>N/A</span>";
								html += 	"<span class='stream_viewers'>0</span>";
								html += "</a>";
						}

						return html;
						
					}	
					
				});
			
		});
		
		
	
		
		
		
		
		
	}); 