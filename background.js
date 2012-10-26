function onRequest(request, sender, sendResponse) {
	var tagMap;
	//update the stored tag list
	chrome.storage.sync.get('rainbow.interestingtags', function(o) {
		tagMap = o['rainbow.interestingtags'];
		if(!tagMap) {
			tagMap = new Object();
		}

		var tmpTagMap = new Object();
		$.each(request.tagMap, function(i, e) {
			if(tagMap[i]) {
				tmpTagMap[i] = tagMap[i];
			} else {
				tmpTagMap[i] = e;
			}
		});

		tagMap = tmpTagMap;

		chrome.storage.sync.set({
			'rainbow.interestingtags': tmpTagMap
		}, function() {
			// Show the page action for the tab that the sender (content script)
			// was on.
			chrome.pageAction.show(sender.tab.id);

			sendResponse({
				tagMap: tagMap
			});
		});


	});


};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);