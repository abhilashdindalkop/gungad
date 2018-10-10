// Author : Abhilash Dindalkop

function startgame() {

	if (USER_ID == undefined || USER_NAME != $('.user_name').val()) {
		// Get USER_NAME
		USER_NAME = $('.user_name').val();
		// Create USER in DB
		// TODO UnComment below line
		//		addUserDB(USER_NAME, 0); 
	}

	// Go to Game Page
	gotoGamePage();

	// Default Settings of Game
	TOTAL_SCORE = 0;
	$HEALTH.css('width', '100%');

	var duration = 3000;

	var insectInterval = createInsectInterval(duration);

	INTERVALS.push(insectInterval);

	// Insect Interval
	var iterativeInsectInterval = setInterval(function () {

		duration = duration + 3000;
		var insectInterval = createInsectInterval(duration);

		INTERVALS.push(insectInterval);

	}, 10000);

	// Bonus Objects Interval
	var bonusObjectInterval = setInterval(function () {

		//Add Bonus Object
		$electric_swatter = addBonusObject(ELECTRO_SWATTER, BONUS_OBJECT.ELECTRO_SWATTER);
		//Attach click function
		$electric_swatter.click(function (e) {
			$electric_swatter.remove();
			enableElectroSwatter(5000);
		});

	}, 50000);

	// Game Over Interval
	var gameoverInterval = setInterval(function () {

		var aliveInsectCount = getAliveInsectsCount();

		var health = 100 - (aliveInsectCount / GAME_OVER_INSECT_LIMIT) * 100;

		$HEALTH.css('width', health + '%');

		if (aliveInsectCount > GAME_OVER_INSECT_LIMIT) {
			gameover();
		}

	}, 1000);

	// INTERVALS
	INTERVALS.push(iterativeInsectInterval);
	INTERVALS.push(bonusObjectInterval);
	INTERVALS.push(gameoverInterval);
}

// Game Over
function gameover() {

	// Update Score in DB
	// TODO UnComment below line
	//	updateUserActive(false);

	// Clear all intervals
	for (var i = 0; i < INTERVALS.length; i++) {
		clearInterval(INTERVALS[i]);
	}

	// Set default cursor
	$GAME_AREA.css('cursor', 'default');

	//Remove all insects and bonus objects
	$('.insect').stop().remove();
	$('.bonus_object').remove();

	// Go to Main Page
	gotoMainPage();
}


function getAliveInsectsCount() {
	var aliveInsects = $GAME_AREA.find('img');
	return aliveInsects.length;
}

// Create Insect Interval
function createInsectInterval(duration) {
	var interval = setInterval(function () {
		var randomInsect = INSECTS[Math.floor(Math.random() * INSECTS.length)];
		createInsect(randomInsect.url, randomInsect.speed, randomInsect.score);

	}, duration);

	return interval;
}

// Create Insect
function createInsect(insect_img, speed, score) {
	var $insect = addInsect(insect_img, score);
	animateDiv($insect, speed);

	// Declare Actions
	$insect.click(function (e) {
		killInsect($(this), e);
	});

	$insect.hover(function (e) {
		if (IS_ELETRO_SWATTER) {
			killInsect($(this), e);
		}
	});

}

//Kill Insect
function killInsect($insect, e) {

	TOTAL_SCORE = TOTAL_SCORE + parseInt($insect.attr('data-score'));

	// Update Score in DB
	// TODO UnComment below line
	//	updateScoreDB(TOTAL_SCORE);
	// Set Score 
	$MY_SCORE.text(TOTAL_SCORE);
	//Show blood
	showBlood(e, RED_BLOOD);
	$insect.stop().remove();
}

function enableElectroSwatter(duration) {
	IS_ELETRO_SWATTER = true;
	cursorToggle(ELECTRO_SWATTER, ELECTRO_SWATTER);
	setTimeout(function () {
		IS_ELETRO_SWATTER = false;
		cursorToggle(SWATTER, SWATTER);
	}, duration);
}

function hitSwatter() {
	if (!IS_ELETRO_SWATTER) {
		cursorToggle(SWATTER, SWATTER_HIT);
	}
}
