export function createValidator({validator, validatorId}) {
    const validate = (data) => {

        let result = validator(data);

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