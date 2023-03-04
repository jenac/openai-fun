const conversation = [];
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'document') {
      const documentData = message.data;
      getConversation(documentData);  
    
    }
  });
  


function getMarkdown(conversation, showQuestions) {
    let markdown = '';

    conversation.forEach(message => {
        if (message.type === 'question') {
            if (showQuestions) {
                markdown += `**Q:** ${message.text}\n\n`;
            }
        } else {
            markdown += `**A:** ${message.text}\n\n`;
        }
    });

    return markdown;
}

function downloadMarkdown(markdown) {
    const filename = `chatgpt-conversation-${new Date().toISOString()}.md`;
    const blob = new Blob([markdown], { type: 'text/markdown' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function init() {
    const toggleQuestions = document.getElementById('toggle-questions');
    const exportButton = document.getElementById('export-button');

    chrome.storage.sync.get({ showQuestions: true }, data => {
       toggleQuestions.checked = data.showQuestions;
    });

    toggleQuestions.addEventListener('change', () => {
        chrome.storage.sync.set({ showQuestions: toggleQuestions.checked });
    });

    exportButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({type: 'save', showQuestion: document.getElementById('toggle-questions').checked});
    });
}

init();