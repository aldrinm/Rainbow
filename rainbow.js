var tagMap = new Object();

//initialize with the user's interested tags and with a default bgcolor
$('#interestingTags > a').each(function() {
  var tag = $(this).text();
  if(!tagMap[tag]) tagMap[tag] = '#e0eaf1';
});

//send tagMap to the background.js script to save
chrome.extension.sendRequest({
  "tagMap": tagMap
}, function(response) {
  sprinkle(response.tagMap);
});

//listen for requests from the popup window
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.method == "resprinkle") {
    sprinkle(request.tagMap);
    // Send JSON data back to Popup.
    sendResponse({
      data: "roger that"
    });
  } else {
    sendResponse({}); // snub them.
  }
});

//sprinkle magic dust
function sprinkle(tagMap) {
  $.each(tagMap, function(i, t) {
    $('a.post-tag').filter(function() {
      return $(this).text() == i;
    }).css('background-color', t);
  })
}
