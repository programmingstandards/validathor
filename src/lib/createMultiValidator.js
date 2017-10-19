export function createMultiValidator(validators) {

    function validate(params, bailOnFail) {

        const validatorsCount = validators.length;
        const validatorIds =  validators.map(validator => validator.validatorId);

        //set results initial state
        let results = validatorIds.reduce((prev, validatorId) => ({...prev, [validatorId]: {
            validated: false,
            results: null,
        }}), {});


        let validValidators = [];
        let invalidValidators = [];
        let validatedValidators = [];
        let skippedValidators = [];
        let bailedAt = null;
        let bailedAtIndex = null;

        for (let i = 0; i < validatorsCount; i++) {
            const validator = validators[i];
            const validatorId = validators[i].validatorId;
            const validationResult = validator.validate(...params);
            results[validatorId].validated = true;
            results[validatorId].results = validationResult;
            validatedValidators.push(validatorId);
            if(validationResult.valid) {
                validValidators.push(validatorId);
            } else {
                invalidValidators.push(validatorId);
                if(bailOnFail) {
                    //If the invalid validator is not the last one, bail flags are not set
                    if (i < validatorsCount - 1) {
                        bailedAt = validatorId;
                        bailedAtIndex = i;
                        skippedValidators = validatorIds.slice(bailedAtIndex + 1, validatorsCount);
                    }
                    break;
                }
            }
        }

        /**
         * Returns the whole results if no params supplied.
         * If Parameter validatorId is supplied, only result for that specific validator is returned.
         */
        function getResults(validatorId){
            if (validatorId){
               return results[validatorId];
            } else {
                return results;
            }
        }

        function getPassedValidators(){
            return validValidators;
        }

        function getFailedValidators(){
            return invalidValidators;
        }

        function getValidatedValidators(){
            return validatedValidators;
        }

        function getSkippedValidators(){
            return skippedValidators;
        }

        function isValid(validatorsList, every = true) {
            /**
             * If no arguments are provided, returns if all results are valid.
             *
             * If one argument, action is based on argument data type.
             * If boolean, the argument is the 'every' boolean to check if either 'every' or 'at least one' is valid
             * among all results.
             * If array, argument is the list of validators. Returns if all in the list are valid.
             * If neither an array nor boolean, argument is considered a single validator id. Returns if it is valid.
             *
             * If two arguments, first will be considered an array of validatorIds and second as the 'every' boolean
             * to check if either 'every' or 'at least one' is valid among all results.
             */
            if(arguments.length === 0) {
                return validatorsCount === validValidators.length;
            } else if (Array.isArray(validatorsList)) {
                const iterate = every ? 'every' : 'some';
                return validatorsList[iterate](validator => validValidators.includes(validator));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? validatorsCount === validValidators.length : validValidators.length > 0;
            } else {
                return validValidators.includes(arguments[0]);
            }

        }

        function isInvalid(validatorsList, every = true) {
            /**
             * If no arguments are provided, returns if at least on result is invalid.
             *
             * If one argument, action is based on argument data type.
             * If boolean, the argument is the 'some' boolean to check if either 'some' or 'every' is invalid
             * among all results.
             * If array, argument is the list of validators. Returns if all in the list are invalid.
             * If neither an array nor boolean, argument is considered a single validator id. Returns if it is invalid.
             *
             * If two arguments, first will be considered an array of validatorIds and second as the 'every' boolean
             * to check if either 'every' or 'at least one' is invalid among all results.
             */
            if(arguments.length === 0) {
                return invalidValidators.length > 0;
            } else if (Array.isArray(validatorsList)) {
                const iterate = every ? 'every' : 'some';
                return validatorsList[iterate](validator => invalidValidators.includes(validator));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? validatorsCount === invalidValidators.length : invalidValidators.length > 0;
            } else {
                return invalidValidators.includes(arguments[0]);
            }

        }

        function isValidated(validatorsList, every = true) {
            if(arguments.length === 0) {
                return validatorsCount === validatedValidators.length;
            } else if (Array.isArray(validatorsList)) {
                const iterate = every ? 'every' : 'some';
                return validatorsList[iterate](validator => validatedValidators.includes(validator));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? validatorsCount === validatedValidators.length : validatedValidators.length > 0;
            } else {
                return validatedValidators.includes(arguments[0]);
            }
        }

        function isSkipped(validatorsList, every = true) {
            if(arguments.length === 0) {
                return skippedValidators.length > 0;
            } else if (Array.isArray(validatorsList)) {
                const iterate = every ? 'every' : 'some';
                return validatorsList[iterate](validator => skippedValidators.includes(validator));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? validatorsCount === skippedValidators.length : skippedValidators.length > 0;
            } else {
                return skippedValidators.includes(arguments[0]);
            }
        }

        function getPassedResults() {
            return getPassedValidators()
                .map(passedValidatorId => results[passedValidatorId].results);
        }

        function getFailedResults() {
            return getFailedValidators()
                .map(failedValidatorId => results[failedValidatorId].results);
        }

        function getValidatedResults() {
            return getValidatedValidators()
                .map(validatedValidatorId => results[validatedValidatorId].results);
        }

        function hasBailed(validatorsList=[]) {
            if(arguments.length === 0){
                return bailedAtIndex !== null;
            } else if(Array.isArray(validatorsList)) {
                return validatorsList.some(possiblyBailedValidator => possiblyBailedValidator === bailedAt);
            }
            return validatorsList === bailedAt;
        }

        function getBailedValidator() {
            return hasBailed() && bailedAt ? bailedAt : null;
        }

        function getBailedResult() {
            return bailedAt ? results[bailedAt].results : null;
        }

        return {
            getResults,
            getPassedValidators,
            getFailedValidators,
            getValidatedValidators,
            getSkippedValidators,
            isValid,
            isInvalid,
            isValidated,
            isSkipped,
            getPassedResults,
            getFailedResults,
            getValidatedResults,
            hasBailed,
            getBailedValidator,
            getBailedResult,
        }

    }

    return {
        validate,
    }
}

export default createMultiValidator;