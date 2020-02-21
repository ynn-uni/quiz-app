export function sleep(time, val) {
	return new Promise(function(r) {
		return setTimeout((function() {
			return r(val);
		}), time);
	});
}
