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

function getFile(file) {
	return new Promise((res, rej) => {
		fakeAjax(file, res);
	});
}

async function outputAllFileContents() {
	const f1 = getFile("file1");
	const f2 = getFile("file2");
	const f3 = getFile("file3");

	output(await f1);
	output(await f2);
	output(await f3);
	output("Complete!");
}
outputAllFileContents();
