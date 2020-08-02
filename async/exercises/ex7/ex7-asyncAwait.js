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
