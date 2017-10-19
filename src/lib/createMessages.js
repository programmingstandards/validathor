import {replaceParams} from "../utils/replaceParams";

export const createMessages = (messageFields, messageCodes) => {
    let messages = messageFields.reduce((prev, messageField) => {
        prev[messageField] = [];
        return prev;
    }, {});

    const getMessageKeys = () => messageFields;

    const getMessages = messageType => {
        return messageType ? (messages[messageType] || []) : messages
    };

    const hasMessages = messageType => {
        if (messageType) {
            return getMessageCount(messageType) > 0;
        } else {
            return getMessageKeys()
                .some(messageTypeKey => getMessageCount(messageTypeKey) > 0)
        }
    };

    const getMessageCount = messageType => {
        if(messageType) {
            return getMessages(messageType).length;
        } else {
            return getMessageKeys()
                .reduce((prev, messageTypeKey) => prev + getMessages(messageTypeKey).length, 0)
        }
    };

    const pushMessage = (messageType, messageCode, params={}) => {
        messages[messageType].push({
            messageCode,
            message: replaceParams(messageCodes[messageCode].messagePattern, params),
        });
    };
    return {
        getMessageKeys,
        hasMessages,
        getMessageCount,
        getMessages,
        pushMessage,
    }
};