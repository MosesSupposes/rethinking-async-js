$(document).ready(function () {
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.react.of(),
		msgs = ASQ.react.of(),
		latest;

	$btn.on("click", function (evt) {
		clicks.push(evt);
	});

	setInterval(() => {
		if (latest) {
			msgs.push("clicked!");
			latest = null;
		}
	}, 1000);

	clicks.val(evt => {
		latest = evt;
	});

	msgs.val(msg => {
		$list.append($("<div>" + msg + "</div>"));
	});
});
