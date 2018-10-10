/* Animate Insect Methods */

function makeNewPosition($container) {
	// Get viewport dimensions (remove the dimension of the div)
	var h = $container.height() - 50;
	var w = $container.width() - 50;
	var nh = Math.floor(Math.random() * h);
	var nw = Math.floor(Math.random() * w);
	return [nh, nw];
}

function animateDiv($target, speed_value) {
	var newq = makeNewPosition($target.parent());
	var oldq = $target.offset();
	var speed = calcSpeed([oldq.top, oldq.left], newq, speed_value);
	$target.animate({
		top: newq[0],
		left: newq[1]
	}, speed, function () {
		animateDiv($target, speed_value);
	});
}

function calcSpeed(prev, next, speed_value) {
	var x = Math.abs(prev[1] - next[1]);
	var y = Math.abs(prev[0] - next[0]);
	var greatest = x > y ? x : y;
	var speedModifier = speed_value;
	var speed = Math.ceil(greatest / speedModifier);
	return speed;
}

/* UTIL Methods */

function cursorToggle(img, img_hit) {
	$GAME_AREA.css('cursor', 'url(' + img_hit + '), auto');
	setTimeout(function () {
		$GAME_AREA.css('cursor', 'url(' + img + '), auto');
	}, 100);
}

function showBlood(e, bloodImg) {
	$GAME_AREA.append('<img class="blood" src="' + bloodImg + '">');
	$('.blood').css('top', e.pageY);
	$('.blood').css('left', e.pageX);
	setTimeout(function () {
		$('.blood').css('opacity', 0.5);
	}, 1000);
	setTimeout(function () {
		$('.blood').remove();
	}, 2000);
}


function addInsect(insect_img, score) {

	if (FACE_URL != undefined) {

		insect_img = FACE_URL;
		var $insect = $('<img />')
			.attr('src', "" + insect_img + "")
			.attr('data-score', score)
			.attr('class', 'insect custom_face_insect');

	} else {

		var $insect = $('<img />')
			.attr('src', "" + insect_img + "")
			.attr('data-score', score)
			.attr('class', 'insect');

	}

	$insect.appendTo($GAME_AREA);

	var position = makeNewPosition($GAME_AREA);
	$insect.css('top', position[0]);
	$insect.css('left', position[1]);
	$insect.on('dragstart', false);

	return $insect;
}

function addBonusObject(image_url, bonus_object_type) {
	var $bonus_object = $('<img />')
		.attr('src', "" + image_url + "")
		.attr('class', 'bonus_object')
		.attr('data-bonus-object-type', bonus_object_type)
		.appendTo($GAME_AREA);

	var position = makeNewPosition($GAME_AREA);
	$bonus_object.css('top', position[0]);
	$bonus_object.css('left', position[1]);

	//Remove bonus object after timeout
	setTimeout(function () {
		$bonus_object.remove();
	}, 5000);

	return $bonus_object;
}


function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}

function gotoMainPage() {
	// Go to Game Page
	$GAME_PAGE.hide();
	$MAIN_PAGE.show();

	$('.game_score').hide();

	if (TOTAL_SCORE != undefined) {
		$('.game_score').show();
		$('.score_value').text(TOTAL_SCORE);
	}

	setMaximumScoredUserData();
}

function gotoGamePage() {
	// Go to Game Page
	$MAIN_PAGE.hide();
	$GAME_PAGE.show();

	$GAME_AREA.css('cursor', 'url(' + SWATTER + '), auto');
}

/* Pop Up Function */
function popup() {
	var popup = document.getElementById("popup_info");
	popup.classList.toggle("show");
}
