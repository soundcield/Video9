// In order to make sure that all extensions are prepared before the first execution
// of extend we must include this short script always at the bottom of all JS
$(function () {
	HttpCom.extend(document);
});