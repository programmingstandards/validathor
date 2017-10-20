export const createMessages = (messageFields) => {
    let messages = messageFields.reduce((prev, messageField) => {
        prev[messageField] = [];
        return prev;
    }, {});

    const getMessageKeys = () => messageFields;

    const getMessages = messageType => {
        return messageType ? (messages[messageType] || []) : messages;
    };

    const getMessageCount = messageType => {
        if(messageType) {
            return getMessages(messageType).length;
        } else {
            return getMessageKeys()
                .reduce((prev, messageTypeKey) => prev + getMessages(messageTypeKey).length, 0);
        }
    };

    const hasMessages = messageType => {
        if (messageType) {
            return getMessageCount(messageType) > 0;
        } else {
            return getMessageKeys()
                .some(messageTypeKey => getMessageCount(messageTypeKey) > 0);
        }
    };


    const pushMessage = (messageType, messageCode, message) => {
        messages[messageType].push({
            messageCode,
            message,
        });
    };
    return {
        getMessageKeys,
        hasMessages,
        getMessageCount,
        getMessages,
        pushMessage,
    };
};