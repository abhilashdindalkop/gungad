var FACE_URL;
var IMAGE_ORIGINAL_SRC;

$(document).ready(function () {

	$("#face_img_upload").change(function () {
		readURL(this);
	});

});

function readURL(input) {

	$('.custom_mosquito_desc').remove();

	$('.mosquito_face_cropper div').remove();

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			IMAGE_ORIGINAL_SRC = e.target.result;
			var $cropper = $('<img />')
				.attr('src', "" + e.target.result + "")
				.attr('id', 'cropper')
				.appendTo($('.mosquito_face_cropper'));

			initCrop();
		}

		reader.readAsDataURL(input.files[0]);
	}
}

function initCrop() {
	var croppr = new Croppr('#cropper', {
		onInitialize: (instance) => {},
		onCropStart: (data) => {},
		onCropEnd: (data) => {},
		onCropMove: (data) => {
			crop(data);
		},
		startSize: [50, 50, '%']
	});
}

function crop(data) {

	var face_canvas = document.getElementsByClassName('mosquito_face')[0];
	var face_context = face_canvas.getContext('2d');

	face_canvas.width = data.width;
	face_canvas.height = data.height;

	//Set Antenna
	var antennaImg = new Image();
	antennaImg.src = "crop/antennas.png";

	// Calculations
	var antennaX = (data.width / 2) - (antennaImg.width / 2);
	var antennaHeight = data.height / 4;

	face_context.drawImage(antennaImg, 0, 0, data.width, antennaHeight);

	// Set Image
	var img = new Image();
	img.src = IMAGE_ORIGINAL_SRC

	face_context.drawImage(img, data.x, data.y, data.width, data.height, 0, antennaHeight, data.width, data.height - antennaHeight);


	FACE_URL = face_canvas.toDataURL();

}
