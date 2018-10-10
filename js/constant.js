/* IMAGE LINKS */
//Swatters
var SWATTER = "images/cursors/swatter.png";
var SWATTER_HIT = "images/cursors/swatter-hit.png";
var ELECTRO_SWATTER = "images/cursors/electro.png";

// Insects
var BLACKY = "images/insects/blacky.gif";
var REDEYE = "images/insects/redeye.gif";
var REDMOS = "images/insects/redmos.gif";
var PURPO = "images/insects/purpo.gif";
var ROCCO = "images/insects/rocco.gif";
var INJECTO = "images/insects/injecto.gif";

//Bloods
var RED_BLOOD = "images/blood.svg";


/* GAME CONSTANT */
var INSECTS = [{
	url: BLACKY,
	speed: 0.1,
	score: 1
    }, {
	url: REDMOS,
	speed: 0.2,
	score: 2
    }, {
	url: PURPO,
	speed: 0.2,
	score: 2
    }, {
	url: REDEYE,
	speed: 0.3,
	score: 3
    }, {
	url: INJECTO,
	speed: 0.3,
	score: 3
    }, {
	url: ROCCO,
	speed: 0.4,
	score: 5
    }];

// Bonus Objects
var IS_ELETRO_SWATTER = false;
var BONUS_OBJECT = {
	ELECTRO_SWATTER: 1
};

// Technical Constants
var GAME_OVER_INSECT_LIMIT = 10;

var $MAIN_PAGE = $('.main_page');
var $GAME_PAGE = $('.game_page');

var $GAME_AREA = $('.game_area');
var $MY_SCORE = $('.my_score');
var $HEALTH = $('.health_bar');

$(document).ready(function () {

	gotoMainPage();

});

// GLOBALS
var USER_ID;
var USER_NAME;
var TOTAL_SCORE;
var INTERVALS = [];
