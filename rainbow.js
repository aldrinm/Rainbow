//get all the current interesting tags from the page
var tagMap
chrome.extension.sendRequest({getItem: "interestingtags"}, function(response) {
								var tagMapStr = response.item;
								if (!tagMapStr) {
									tagMapStr = JSON.stringify(new Object());
								}
								tagMap = JSON.parse(tagMapStr);

								$('#interestingTags > a').each(function(){
																//alert($(this).text());
																var tag = $(this).text();
																if (!tagMap[tag]) tagMap[tag] = '#ffefc6'
															});	

								chrome.extension.sendRequest({setItem: "interestingtags", value:JSON.stringify(tagMap)});

								sprinkle();
							});

							


function sprinkle() {
	$('#question-mini-list .tagged-interesting').find('a.post-tag').each(function(){
		var val = $(this).text();
		//console.log ('val = '+val+'   tagMapStr[val] = '+tagMap[val]);
		if (tagMap[val]) {
			$(this).parentsUntil('div.question-summary').parent().css('background-color', tagMap[val]);
		}
	});
	

}

