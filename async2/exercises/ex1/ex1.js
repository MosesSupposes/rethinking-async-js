const allFiles = {
	file1: undefined,
	file2: undefined,
	file3: undefined,
};

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");

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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file, function (text) {
		// what do we do here?
		switch (file) {
			case "file1":
				allFiles[file] = text;
				output(text);
				break;

			case "file2":
				(function output2ndFile() {
					if (allFiles["file1"]) {
						allFiles[file] = text;
						output(text);
					} else {
						setTimeout(output2ndFile, 0);
					}
				})();
				break;

			case "file3":
				(function output3rdFile() {
					if (allFiles["file1"] && allFiles["file2"]) {
						allFiles[file] = text;
						output(text);
					} else {
						setTimeout(output3rdFile, 1000);
					}
				})();
				break;

			default:
				return;
		}
	});
}
