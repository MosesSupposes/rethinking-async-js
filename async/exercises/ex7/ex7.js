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
	return ASQ(function (done) {
		fakeAjax(file, done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

ASQ()
	.runner(function* outputAllFileContents() {
		const f1 = getFile("file1");
		const f2 = getFile("file2");
		const f3 = getFile("file3");

		output(yield f1);
		output(yield f2);
		output(yield f3);
	})
	.val(() => output("Complete!"));

//  Here's the absctraction ASQ.runner provides...
// const it = outputAllFileContents();
// // initialize generator to first yield
// it.next();
// // grab the value of the promise yielded from the generator
// const promiseResposne = it.next().value;
// // resume the generator, passing in the resolved promise
// promiseResposne.then(val => it.next(val));
