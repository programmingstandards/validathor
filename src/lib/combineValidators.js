import { createMultiValidator } from './createMultiValidator';

export function combineValidators( validators, combinedResultsCb ) {
    let combinedValidator = createMultiValidator(validators);
    return function (params, bailOnFail) {
        return combinedResultsCb(combinedValidator.validate(params, bailOnFail));
    }
}