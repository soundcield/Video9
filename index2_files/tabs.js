HttpCom.extensions.initTabs = function (scope) {
	$('ul.dyna-tabs', scope).each(function () {
		var $ul = $(this),
			$li = $ul.children(),
			$active = $li.filter('.active'),
			$div = $ul.nextAll('.tab').hide();
		if ($active.length) {
			$div.eq($active.index()).show();
		}
		$li.find('a').bind('click', function () {
			var $t = $(this).closest('li');
			if (!$t.is('.active')) {
				$div.eq($t.siblings().filter('.active').removeClass('active').index()).hide();
				$div.eq($t                                .addClass('active').index()).show();
			}
			return false;
		});
	});
}