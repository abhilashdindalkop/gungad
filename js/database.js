// Author : Abhilash Dindalkop

firebase.initializeApp({
	apiKey: < APIKEY > ,
	projectId: < PROJECT_ID > ,
});

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();
const settings = {
	timestampsInSnapshots: true
};
firestore.settings(settings);


function addUserDB(name, score) {

	firestore.collection("users").add({
			name: name,
			score: score,
			best_score: score,
			created_at: new Date().getTime(),
			is_active: true
		})
		.then(function (docRef) {
			USER_ID = docRef.id;
			console.log("user id: ", docRef.id);
		})
		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
}

function updateScoreDB(score) {
	// Update USER_ID score
	var userRef = firestore.collection("users").doc(USER_ID);

	userRef.get().then(function (user) {
		if (user.exists) {
			if (user.data().best_score < user.data().score) {
				userRef.update({
					best_score: score
				});
			}
		}
	}).catch(function (error) {
		console.log("Error getting document:", error);
	});

	userRef.update({
		score: score,
		is_active: true
	});

}

function updateUserActive(isActive) {

	// Update USER_ID score
	firestore.collection("users").doc(USER_ID).update({
		is_active: isActive
	});

}

function setMaximumScoredUserData() {

	var usersRef = firestore.collection("users").orderBy("best_score", "desc").limit(1);

	usersRef.get().then(function (doc) {

		firestore.collection("users").doc(doc.docs[0].id).get().then(function (user) {
			if (user.exists) {
				var user_name = "unknown";
				if (user.data().name.length != 0) {
					user_name = user.data().name;
				}
				$('.best_score_name').text(user_name);
				$('.best_score_value').text(user.data().best_score);
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});

	}).catch(function (error) {
		console.log("Error ", error);
	});


}
