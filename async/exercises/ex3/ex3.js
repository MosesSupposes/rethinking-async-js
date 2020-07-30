function fakeAjax(url, cb) {
	var fake_responses = {
		file1: "The first text",
		file2: "The middle text",
		file3: "The last text",
	};
	var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function () {
		cb(fake_responses[url]);
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	// what do we do here?
	return new Promise((resolve, reject) => {
		fakeAjax(file, resolve);
	});
}

// request all files at once in "parallel"
const allFiles = Promise.all([
	getFile("file1"),
	getFile("file2"),
	getFile("file3"),
]).then(results => {
	output(results[0]);
	output(results[1]);
	output(results[2]);
});
