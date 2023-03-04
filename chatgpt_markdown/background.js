chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'save') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: 'content.js' }, function () {
                chrome.tabs.sendMessage(tabs[0].id, { showQuestion: request.showQuestion }, function (response) {
                    debugger;
                  
                    var conversation = response.conversation;
                    console.log(conversation);
                    var filename = 'chatgpt-conversation-' + new Date().toISOString().slice(0, 10) + '.md';
                    var markdown = '';
                    for (var i = 0; i < conversation.length; i++) {
                        var message = conversation[i];
                        if (!request.showQuestion && message.type === 'question') {
                            continue;
                        }
                        markdown += '- ' + message.text.replace(/\n/g, '  \n') + '\n';
                    }
                    var blob = new Blob([markdown], { type: 'text/markdown' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();
             //       var url = URL.createObjectURL(blob);
               //     chrome.downloads.download({ url: url, filename: filename });
                });
            });
        });
    }
});
