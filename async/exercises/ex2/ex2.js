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

function makeThunk(fn, ...args) {
	const val = fn(...args);
	return function (cb) {
		return cb(val);
	};
}

function getFile(file) {
	let text, fn;
	fakeAjax(file, response => {
		if (fn) fn(response);
		else text = response;
	});

	return function (cb) {
		if (text) cb(text);
		else fn = cb;
	};
}

// request all files at once in "parallel"
const thunk1 = getFile("file1");
const thunk2 = getFile("file2");
const thunk3 = getFile("file3");

thunk1(contents => {
	output(contents);
	thunk2(contents => {
		output(contents);
		thunk3(contents => {
			output(contents);
			output("Complete!");
		});
	});
});
