chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var conversationElement = document.getElementsByClassName('items-center')[0];
    var messages = conversationElement.getElementsByClassName('text-gray-800');
    var conversation = [];
    for (var i = 0; i < messages.length; i++) {
        var messageElement = messages[i];
        const isQuestion = messageElement.querySelector('.markdown') == null;
        var message = {
            type: isQuestion ? 'question' : 'answer',
            text: isQuestion ? messageElement.textContent : messageElement.querySelector('.markdown').textContent
        };
        conversation.push(message);
    }
    sendResponse({ conversation: conversation });
});


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     debugger;
//     if (message === 'getConversation') {
//         const conversation = getConversation();
//         sendResponse(conversation);
//     }
// });

// function getConversation() {
//     const documentData = document.getElementsByClassName('items-center')[0]
//     const messages = Array.from(documentData.getElementsByClassName('text-gray-800'));


//     messages.forEach(message => {
//         console.log(message.textContent);
//         const isQuestion = message.querySelector('.markdown');

//         if (isQuestion) {
//             conversation.push({ type: 'question', text: message.txtContent });
//         } else {
//             const text = message.querySelector('.markdown').textContent.trim();
//             conversation.push({
//                 type: 'answer', text
//             });
//         }
//     });

//     return conversation;
// }