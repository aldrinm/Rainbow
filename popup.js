document.addEventListener('DOMContentLoaded', init);

function init() {
	chrome.storage.sync.get('rainbow.interestingtags', function(o) {
		var tagMap = o['rainbow.interestingtags'];
		if(!tagMap) {
			return;
		}
		$('#interesting-tags').empty();
		for(var tag in tagMap) {
			var li = $('<li><div class="taglabel">' + tag + '</div> <div class="hoverBox"></div></li>');
			var tt = $('#interesting-tags').append(li);
			$(li).find('.hoverBox').wColorPicker({
				initColor: tagMap[tag],
				onSelect: function(color) { },
				mode: 'hover',
				effect: 'none',
				theme: 'green'
			});
		}

		$('#save').click(function() {
			var tagMap = new Object();
			$('#interesting-tags li').each(function() {
				var tagName = $(this).find('.taglabel').text();
				var tagValue = $(this).find('._wColorPicker_buttonColor').css('background-color');
				console.log('tagValue = '+tagValue);
				tagMap[tagName] = tagValue;
			});

			chrome.storage.sync.set({
				'rainbow.interestingtags': tagMap
			}, function() {
				chrome.tabs.getSelected(null, function(tab) {
					chrome.tabs.sendMessage(tab.id, {
						method: "resprinkle",
						tagMap: tagMap
					}, function(response) {
						window.close();
					});
				});


			});


		});


	});

}