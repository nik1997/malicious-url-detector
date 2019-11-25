document.addEventListener('DOMContentLoaded', function() {
    let checkCurrentURLButton = document.getElementById('checkCurrentURL');
    checkCurrentURLButton.addEventListener('click', function() {
        chrome.tabs.getSelected(null, function(tab) {
            alert('Current URL is ' + tab.url)
        });
    }, false);
}, false);