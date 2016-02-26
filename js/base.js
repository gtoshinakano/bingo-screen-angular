/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
		var cw = $('.circle-box').width();
		$('.circle-box').css({'height': cw+'px'});
    });
	
	var cw = $('.circle-box').width();
	$('.circle-box').css({'height':cw+'px'});
	
});


var goneNumbers = [];
	
$(document).ready(function(){
	
	$('.circles').css({ z: 'scale(5.2)' });
	$("#der").transition({ x: 200 });
	$('#der').css({ transform: 'scale(5.2)' });
	$(this).on("submit", "form", function(e){
		
		e.preventDefault();
		
	});
	
	/**************************************
	 * show-number Btn Controller
	 **************************************/
	$(this).on("click", '#show-number', function(){
		
		$('.alert').hide();
		
		var selectedNumber = $("#selected-number").val(); 
		
		if(selectedNumber > 0 && selectedNumber <= 75){
			
			if(goneNumbers.indexOf(selectedNumber) < 0){
				
				goneNumbers.push(selectedNumber);
				var container = (selectedNumber <= 15) ? "b-col" : (selectedNumber <= 30) ? "i-col" : (selectedNumber <= 45) ? "n-col" : (selectedNumber <= 60) ? "g-col" : (selectedNumber <= 75) ? "o-col" : "";
				$('#inner-number').text(selectedNumber);
				$("#show-number-dialog").modal();
				$("#selected-number").val("");
				$("#"+container).append('<div class="circle-box"><div class="circles"><a class="close-number" href="#"><span>'+selectedNumber+'</span></a></div></div>');
				var cw = $('.circle-box').width();
				$('.circle-box').css({'height':cw+'px'});
			
			}else{
			
				$('#danger-message').html("O número <b>" + selectedNumber + "</b> já saiu.");
				$('.alert').fadeIn(500);
				
			}
			
		}else{
			
			$('#danger-message').html("Digite apenas números de <b>1 a 75</b>.");
			$('.alert').fadeIn(500);
			
		}
		
	});
	
	$("#show-number-dialog").on('hidden.bs.modal', function(){
		
		$("#selected-number").focus();
		
	});
	
	$(this).keyup(function(e){
		
		if(e.keyCode == 27){
			$("#show-number-dialog").modal('hide');
			$("#show-bingo-dialog").modal('hide');
		}
		
	});
	
	/**************************************
	 * show-bingo Btn Controller
	 **************************************/
	$('#show-bingo').on("click", function(){
		
		$("#show-bingo-dialog").modal();
		var imgElement = $('.modal-bingo img');
		imgElement.attr("src","img/bingo1.gif");
		imgElement.fadeOut(1500, function(){
			
			imgElement.attr("src","img/bingo2.gif");
			imgElement.fadeIn(400);
			
		});
		
		
	});
	
	/**************************************
	 * show-prize Btn Controller
	 **************************************/
	$('#show-prize').click(function(){
		
		$('.alert').hide();
		var selectedPrize = $("#selected-prize");
		var selectedSerie = $("#selected-serie");
		if(selectedPrize.val() != "" && selectedSerie.val() != ""){
			
			$("h2#prize-container").html('<b style="color:#D13A43">' + selectedSerie.val() +'</b> <i class="fa fa-trophy" ></i> ' + selectedPrize.val());
			
		}else{
			
			$('#danger-message').html("Digite a série e o primeiro prêmio <span class='glyphicon glyphicon-arrow-right'></span>");
			$('.alert').fadeIn(500);
			
		}
		
	});
	
});

/**************************************
 * Circle box Controller
 **************************************/
$(document).on('click', '.circle-box', function(){
	
	var thisNumber = $(this).find('div.circles span').text();
	var key = goneNumbers.indexOf(thisNumber);
	goneNumbers.splice(key, 1);
    $(this).remove();
	
});

$(document).on('click', 'a.close-number', function(e){
	
	e.preventDefault();
	
});
