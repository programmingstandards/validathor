export const createMessages = (messageFields) => {
    let messages = {};
    if(messageFields.constructor === Object) {
        messages = {...messageFields};
    } else if(Array.isArray(messageFields)) {
        messages = messageFields.reduce((prev, messageField) => {
            prev[messageField] = [];
            return prev;
        }, {});
    }

    const getMessageKeys = () => Object.keys(messages);

    const getMessageKeysCount = () => getMessageKeys().length;
    
    function hasMessageKeys (keys, every=true) {
        switch(arguments.length) {
            case 0:
                return getMessageKeysCount() > 0;
            case 1:
            case 2:
                if(Array.isArray(keys)) {
                    const iterate = every ? 'every' : 'some';
                    return keys[iterate]((key) => hasMessageKeys(key));
                }
                return getMessageKeys().includes(keys);
            default: 
                break;
        }
        return false;
    }

    const getMessages = messageType => {
        return messageType ? (messages[messageType] || []) : messages;
    };

    function getMessagesCount(messageKeys) {
        switch(arguments.length) {
            case 0:
                return getMessageKeys()
                    .reduce((prev, messageKey) => prev + getMessagesCount(messageKey), 0);
            case 1:
                if(Array.isArray(messageKeys)) {
                    return messageKeys
                    .reduce((prev, messageKey) => prev + getMessagesCount(messageKey), 0);   
                }
                return getMessages(messageKeys).length;        
        }
        return 0;
    }

    function hasMessages(messageKeys, every = false) {
        switch(arguments.length) {
            case 0:
                return getMessageKeys()
                        .some(messageKey => getMessagesCount(messageKey) > 0);
            case 1:
                if(typeof arguments[0 === "boolean"]){
                    const iterate = every ? 'every' : 'some';                    
                    return getMessageKeys()[iterate](messageKey => getMessagesCount(messageKey) > 0);
                }
            case 2:
                if(Array.isArray(messageKeys)) {
                    const iterate = every ? 'every' : 'some';
                    return messageKeys[iterate](messageKey => getMessagesCount(messageKey) > 0);
                }
                return getMessagesCount(messageKeys) > 0;
        }
        return false;
    }

    const pushMessages = (messageKey, message, messageCode, ) => {
        if(typeof messageKey === "string") {
            messages[messageKey].push({
                messageCode,
                message,
            });
        } else if (Array.isArray(messageKey)) {
            const messagesToBePushed = messageKey;
            messagesToBePushed.forEach((messageToBePushed) => {
                const [messageKey, message, messageCode] = messageToBePushed;
                messages[messageKey].push({
                    messageCode,
                    message,
                });
            });
        } else if(arguments[0].constructor === Object) {
            const messagesToBePushed = arguments[0];
            const messageKeys = Object.keys(messagesToBePushed);
            messageKeys.forEach((key) => {
                const messagesForCurrentKey = messagesToBePushed[key];
                messagesForCurrentKey.forEach((messageForCurrentKey)=> {
                    const { message, messageCode } = messageForCurrentKey;     
                    messages[key].push({
                        messageCode,
                        message,
                    });           
                });
            });        
        }
    };
    return {
        hasMessageKeys,
        getMessageKeys,        
        getMessageKeysCount,
        hasMessages,
        getMessages,
        getMessagesCount,        
        pushMessages,
    };
};