export function createValidator({validator, validatorId, messageCodes={}}) {
    const validate = (data, customMessageCodes={}) => {

        //merge default codes and custom codes
        const mergedMessageCodes = Object.keys(messageCodes)
            .reduce((prev, messageCode) => {
                return {
                    ...prev,
                    [messageCode]: {
                        ...prev[messageCode],
                        ...customMessageCodes[messageCode]
                    }
                }
            }, messageCodes);

        let result = validator(data, mergedMessageCodes);

        const { valid = true, messages } = result;

        const { getMessageKeys, getMessages, getMessageCount, hasMessages } = messages;


        return {
            validatorId,
            valid,
            getMessageKeys,
            getMessages,
            getMessageCount,
            hasMessages,
        };
    };

    return {
        validate,
        validatorId,
    };
}