const exportButton = document.getElementById('export-button');
if (exportButton) {
    exportButton.onclick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            tabId = tabs[0].id;
            injectScrtiptToTab(tabId);
        })

    }
} else {
    alert('No export button found');
}

const injectScrtiptToTab = (tabId) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            func: exportAsMarkdown,
        },
        () => { }
    );
}

const exportAsMarkdown = () => {
    console.log('exportAsMarkdown');
    // alert("Hello world!");
    const parseDocument = () => {
        const documentData = document.getElementsByClassName('items-center')[0];
        const messages = Array.from(documentData.getElementsByClassName('text-gray-800'));
        const conversation = messages.map((message, index) => {
            //simply take even as question (0, 2, 4, ...)
            if (index % 2 == 0) {
                return `**Q:** ${message.textContent.replace(/\n/g, '  \n')}\n\n`;
            } else {
                const section = message.querySelector('.markdown');
                let parsedText = '';
                for (let i = 0; i < section.children.length; i++) {
                    const child = section.children[i];
                    if (child.tagName.toLowerCase() === 'pre') {
                        const code = child.querySelector('code');
                        parsedText += "```" + code.textContent.replace(/\n/g, '  \n') + "```\n\n";
                    } else {
                        
                        parsedText += child.textContent.replace(/\n/g, '  \n') + "\n\n";
                    }
                }
                return `**A:** ${parsedText}\n\n`
            }

        })
        return conversation;
    };


    const conversation = parseDocument();
    // console.log(conversation);

    const markDown = conversation.reduce((prev, curr) => prev + curr);
    console.log(markDown);

    const filename = 'chatgpt-conversation-' + new Date().toISOString().slice(0, 10) + '.md';
    var blob = new Blob([markDown], { type: 'text/markdown' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}