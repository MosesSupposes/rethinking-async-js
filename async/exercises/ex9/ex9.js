$(document).ready(function () {
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.csp.chan(),
		msgs = ASQ.csp.chan(),
		queuedClick;

	$btn.on("click", listenToClicks);

	ASQ().runner(ASQ.csp.go(sampleClicks), ASQ.csp.go(logClick));

	function listenToClicks(evt) {
		if (!queuedClick) {
			queuedClick = ASQ.csp.putAsync(clicks, evt);
			queuedClick.then(function () {
				queuedClick = null;
			});
		}
	}

	function* sampleClicks() {
		while (true) {
			yield ASQ.csp.take(ASQ.csp.timeout(1000));
			yield ASQ.csp.take(clicks);
			yield ASQ.csp.put(msgs, "clicked!");
		}
	}

	function* logClick() {
		while (true) {
			var msg = yield ASQ.csp.take(msgs);
			$list.append($("<div>" + msg + "</div>"));
		}
	}
});
