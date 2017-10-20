// import {createValidator} from "../src/lib/createValidator";
// import { createMultiValidator } from '../src/lib/createMultiValidator';
// import {createMessages} from "../src/lib/createMessages";
// import {combineValidators} from "../src/lib/combineValidators";

// const ODD_MESSAGE_CODES = {
//     "validationSuccessful": {
//         description: "Validation Successful",
//         messagePattern: "Validated successfully",
//     },
//     "differentDataType": {
//         description: "Different from expected data type",
//         messagePattern: "The value :value of parameter :parameter is of type :actualType. :expectedType was expected.",
//     },
//     "validationFailed": {
//         description: "Validation failed",
//         messagePattern: ":value is not an odd number.",
//     },
// };

// export const isOddNum = (num, messageCodes) => {
//     const valid = num % 2 == 1;
//     let messages = createMessages([ 'success', 'errors', 'warnings' ], messageCodes);

//     if (valid){
//         messages.pushMessage('success', 'validationSuccessful');
//         if (typeof num === 'string') {
//             messages.pushMessage('warnings', 'differentDataType', { value: num, parameter: "num", actualType: "integer", expectedType: "string" })
//         }
//     } else {
//         messages.pushMessage('errors', 'validationFailed', { value: num })
//     }

//     return {
//         valid,
//         messages: messages,
//     }
// };

// export const oddNumberValidator = createValidator({
//     validator: isOddNum,
//     validatorId: "oddNumberValidator",
//     messageCodes: ODD_MESSAGE_CODES,
// });

// const PRIME_MESSAGE_CODES = {
//     "validationSuccessful": {
//         description: "Validation Successful",
//         messagePattern: "Validated successfully",
//     },
//     "differentDataType": {
//         description: "Different from expected data type",
//         messagePattern: "The value :value of parameter :parameter is of type :actualType. :expectedType was expected.",
//     },
//     "validationFailed": {
//         description: "Validation failed",
//         messagePattern: ":value is not an odd number.",
//     },
// };

// export const isPrimeNum = (num, messageCodes) => {
//     function isPrime(value) {
//         for(var i = 2; i < value; i++) {
//             if(value % i === 0) {
//                 return false;
//             }
//         }
//         return value > 1;
//     }
//     const valid = isPrime(num);
//     let messages = createMessages([ 'success', 'errors', 'warnings' ], messageCodes);

//     if (valid){
//         messages.pushMessage('success', 'validationSuccessful');
//         if (typeof num === 'string') {
//             messages.pushMessage('warnings', 'differentDataType', { value: num, parameter: "num", actualType: "integer", expectedType: "string" })
//         }
//     } else {
//         messages.pushMessage('errors', 'validationFailed', { value: num })
//     }

//     return {
//         valid,
//         messages: messages,
//     }
// };

// export const primeNumberValidator = createValidator({
//     validator: isPrimeNum,
//     validatorId: "primeNumberValidator",
//     messageCodes: PRIME_MESSAGE_CODES,
// });

// const LESS_THAN_100_MESSAGE_CODES = {
//     "validationSuccessful": {
//         description: "Validation Successful",
//         messagePattern: "Validated successfully",
//     },
//     "differentDataType": {
//         description: "Different from expected data type",
//         messagePattern: "The value :value of parameter :parameter is of type :actualType. :expectedType was expected.",
//     },
//     "validationFailed": {
//         description: "Validation failed",
//         messagePattern: ":value is not less than 100.",
//     },
// };

// export const lessThan100 = (num, messageCodes) => {
//     function isLessThan100(value) {
//         return value < 100;
//     }
//     const valid = isLessThan100(num);
//     let messages = createMessages([ 'success', 'errors', 'warnings' ], messageCodes);

//     if (valid){
//         messages.pushMessage('success', 'validationSuccessful');
//         if (typeof num === 'string') {
//             messages.pushMessage('warnings', 'differentDataType', { value: num, parameter: "num", actualType: "integer", expectedType: "string" })
//         }
//     } else {
//         messages.pushMessage('errors', 'validationFailed', { value: num })
//     }

//     return {
//         valid,
//         messages: messages.getMessages(),
//     }
// };

// export const lessThan100Validator = createValidator({
//     validator: lessThan100,
//     validatorId: "lessThan100Validator",
//     messageCodes: LESS_THAN_100_MESSAGE_CODES,
// });

// describe('For valid odd number', () => {
//     let res;

//     beforeAll(()=>{
//        res = oddNumberValidator.validate(7, {validationSuccessful: {messagePattern: "Test validation success message"}});
//     });

//     test('the valid field should be true', () => {
//         expect(res.valid).toBe(true);
//     });

//     test('validatorId should be correct ', () => {
//         expect(res.validatorId).toBe("oddNumberValidator");
//     });

//     test('getMessageKeys should return the keys in \'messages\' field returned by the user-defined validator, in the specified order', () => {
//         expect(res.getMessageKeys()).toEqual([ 'success', 'errors', 'warnings' ]);
//     });

//     describe('getMessageCount should be', () => {
//         test('return correct total count without parameters', () => {
//             expect(res.getMessageCount()).toBe(1);
//         });
//         test('return correct count with parameters for non-empty message list', () => {
//             expect(res.getMessageCount('success')).toBe(1);
//         });
//         test('return correct count with parameters for empty message list', () => {
//             expect(res.getMessageCount('errors')).toBe(0);
//         });
//     });

//     describe('hasMessages should', () => {
//         test('return correct boolean value without any message type parameter', () => {
//             expect(res.hasMessages()).toBe(true);
//         });
//         test('return true for non-empty message list', () => {
//             expect(res.hasMessages('success')).toBe(true);
//         });
//         test('return false for empty message list', () => {
//             expect(res.hasMessages('errors')).toBe(false);
//         });
//     });

//     describe('A message should', () => {
//         test('contain the merged fields passed via validate() function', () => {
//             expect(res.getMessages('success')[0].message).toBe('Test validation success message');
//         });
//         test('contain the message code unchanged', () => {
//             expect(res.getMessages('success')[0].messageCode).toBe('validationSuccessful');
//         });
//     });


// });

// describe('Invalid odd number 8', () => {
//     let res;
//     beforeAll(()=>{
//         res = oddNumberValidator.validate(8);
//     });

//     test('should be invalid', () => {
//         expect(res.valid).toBe(false);
//     });

// });

// const combinedOddAndPrimeValidator = createMultiValidator([ oddNumberValidator, primeNumberValidator ]);

// describe('In createMultiValidator, for valid odd number and  valid prime', () => {
//     let res;

//     beforeAll(()=>{
//         res = combinedOddAndPrimeValidator
//             .validate([7]);
//     });

//     test('should be validating all the validators if not bailed on failure', () => {
//         expect(res.getValidatedValidators()).toEqual(["oddNumberValidator", "primeNumberValidator"]);
//     });

//     test('should pass all validators', () => {
//         expect(res.getPassedValidators()).toEqual(["oddNumberValidator", "primeNumberValidator"]);
//     });

//     test('should not fail any validator', () => {
//         expect(res.getFailedValidators()).toEqual([]);
//     });

//     test('should not skip any validator', () => {
//         expect(res.getSkippedValidators()).toEqual([]);
//     });

//     describe("isValid() tests", () => {
//         test('isValid() should return true if all validations were successful', () => {
//             expect(res.isValid()).toBe(true);
//         });

//         test('isValid(true) should return the same result as  isValid()', () => {
//             expect(res.isValid(true)).toBe(res.isValid());
//         });

//         test('isValid(false) should return true if at least one of validations was successful', () => {
//             expect(res.isValid(false)).toBe(true);
//         });

//         test('isValid(someValidatorId) should return true if the specific validation was successful', () => {
//             expect(res.isValid('oddNumberValidator')).toBe(true);
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\']) should return true if the specific validations were successful', () => {
//             expect(res.isValid(["oddNumberValidator", "primeNumberValidator"])).toBe(true);
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isValid([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isValid(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isValid(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one validation specified were successful', () => {
//             expect(res.isValid(["oddNumberValidator", "primeNumberValidator"], false)).toBe(true);
//         });
//     });

//     describe("isInvalid() tests", () => {
//         test('isInvalid() should return false if all validations were successful', () => {
//             expect(res.isInvalid()).toBe(false);
//         });

//         test('isInvalid(true) should return the same result as isInvalid()', () => {
//             expect(res.isInvalid(true)).toBe(res.isInvalid());
//         });

//         test('isInvalid(false) should return false if at least one of validations was successful', () => {
//             expect(res.isInvalid(false)).toBe(false);
//         });

//         test('isInvalid(\'someValidatorId\') should return false if the specific validation was successful', () => {
//             expect(res.isInvalid('oddNumberValidator')).toBe(false);
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\']) should return false if the specific validations were successful', () => {
//             expect(res.isInvalid(["oddNumberValidator", "primeNumberValidator"])).toBe(false);
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isInvalid([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isInvalid(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isInvalid(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return false if not even one of the validations specified were successful', () => {
//             expect(res.isInvalid(["oddNumberValidator", "primeNumberValidator"], false)).toBe(false);
//         });
//     });

//     describe("isValidated() tests", () => {
//         test('isValidated() should return true if all validators were validated', () => {
//             expect(res.isValidated()).toBe(true);
//         });

//         test('isValidated(true) should return the same result as isValidated()', () => {
//             expect(res.isValidated(true)).toBe(res.isValidated());
//         });

//         test('isValidated(false) should return true if at least one of validators was validated', () => {
//             expect(res.isValidated(false)).toBe(true);
//         });

//         test('isValidated(\'someValidatorId\') should return true if the specific validator was validated', () => {
//             expect(res.isValidated('oddNumberValidator')).toBe(true);
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\']) should return true if the specific validators were validated', () => {
//             expect(res.isValidated(["oddNumberValidator", "primeNumberValidator"])).toBe(true);
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isValidated([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isValidated(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isValidated(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one of the validations specified were successful', () => {
//             expect(res.isValidated(["oddNumberValidator", "primeNumberValidator"], false)).toBe(true);
//         });
//     });

//     describe("isSkipped() tests", () => {
//         test('isSkipped() should return false if all validators were validated', () => {
//             expect(res.isSkipped()).toBe(false);
//         });

//         test('isSkipped(true) should return the same result as isSkipped()', () => {
//             expect(res.isSkipped(true)).toBe(res.isSkipped());
//         });

//         test('isSkipped(false) should return false if at least one of validators was validated', () => {
//             expect(res.isSkipped(false)).toBe(false);
//         });

//         test('isSkipped(\'someValidatorId\') should return f if the specific validator was validated', () => {
//             expect(res.isSkipped('oddNumberValidator')).toBe(false);
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\']) should return false if the specific validators were validated', () => {
//             expect(res.isSkipped(["oddNumberValidator", "primeNumberValidator"])).toBe(false);
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isSkipped(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isSkipped(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one of the validations specified were validated', () => {
//             expect(res.isSkipped(["oddNumberValidator", "primeNumberValidator"], false)).toBe(false);
//         });
//     });

//     //TODO: write tests for getPassedResults()
//     describe("getPassedResults() tests", () => {
//         test('getPassedResults() should return all validator results if all validations are passed', () => {
//             expect(res.getPassedResults().map(v => v.validatorId)).toEqual(['oddNumberValidator', 'primeNumberValidator']);
//         });
//     });

//     //TODO: write tests for getFailedResults()
//     describe("getFailedResults() tests", () => {
//         test('getFailedResults() should return empty array if all validations are passed', () => {
//             expect(res.getFailedResults().map(v => v.validatorId)).toEqual([]);
//         });
//     });

//     //TODO: write tests for getValidatedResults()
//     describe("getValidatedResults() tests", () => {
//         test('getPassedResults() should return all validator results if all validations are passed, just like getPassedResults()', () => {
//             expect(res.getValidatedResults()).toEqual(res.getPassedResults());
//         });
//     });

//     describe("hasBailed() tests", () => {
//         test('hasBailed() should return false if all validators were validated', () => {
//             expect(res.hasBailed()).toBe(false);
//         });
//         test('hasBailed(\'someValidatorId\') should return false if all validators were validated', () => {
//             expect(res.hasBailed('oddNumberValidator')).toBe(false);
//         });
//         test('hasBailed([\'someValidatorId1\', \'someValidatorId2\']) should return false if all validators were validated', () => {
//             expect(res.hasBailed(['oddNumberValidator', 'primeNumberValidator'])).toBe(false);
//         });
//     });

//     describe("getBailedValidator() tests", () => {
//         test('getBailedValidator() should return null if all validators were validated', () => {
//             expect(res.getBailedValidator()).toBe(null);
//         });
//     });

//     describe("getBailedResult() tests", () => {
//         test('getBailedResult() should return empty array if all validators were validated', () => {
//             expect(res.getBailedResult()).toBe(null);
//         });
//     });

// });

// const combinedOddAndPrimeAndLessThan100Validator = createMultiValidator([ oddNumberValidator, primeNumberValidator, lessThan100Validator ]);

// describe('Failure with Bail tests - In createMultiValidator, for valid odd and invalid prime number and less than 100 ', () => {
//     let res;

//     beforeAll(()=>{
//         res = combinedOddAndPrimeAndLessThan100Validator
//             .validate([21], true);
//     });

//     test('should be validating the validators upto the one bailed on failure', () => {
//         expect(res.getValidatedValidators()).toEqual(["oddNumberValidator", "primeNumberValidator"]);
//     });

//     test('should pass only the valid validators before the bailed validator', () => {
//         expect(res.getPassedValidators()).toEqual(["oddNumberValidator"]);
//     });

//     test('should fail only the validator at which the validations bail', () => {
//         expect(res.getFailedValidators()).toEqual(['primeNumberValidator']);
//     });

//     test('should skip the validators after the bailed one', () => {
//         expect(res.getSkippedValidators()).toEqual(['lessThan100Validator']);
//     });

//     describe("isValid() tests", () => {
//         test('isValid() should return false if at least validations were failed', () => {
//             expect(res.isValid()).toBe(false);
//         });

//         test('isValid(true) should return the same result as  isValid()', () => {
//             expect(res.isValid(true)).toBe(res.isValid());
//         });

//         test('isValid(false) should return true if at least one of validations was successful', () => {
//             expect(res.isValid(false)).toBe(true);
//         });

//         test('isValid(someValidatorId) should return true if the specific validation was successful', () => {
//             expect(res.isValid('oddNumberValidator')).toBe(true);
//         });

//         test('isValid(someValidatorId) should return false if the specific validation was failed', () => {
//             expect(res.isValid('primeNumberValidator')).toBe(false);
//         });

//         test('isValid(someValidatorId) should return false if the specific validation was skipped', () => {
//             expect(res.isValid('lessThan100Validator')).toBe(false);
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\']) should return true if the specific validations were successful', () => {
//             expect(res.isValid(["oddNumberValidator"])).toBe(true);
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\']) should return false if all the specified validations were not successful', () => {
//             expect(res.isValid(["oddNumberValidator", "primeNumberValidator"])).toBe(false);
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isValid([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isValid(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isValid(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isValid([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one validation specified were successful', () => {
//             expect(res.isValid(["oddNumberValidator", "primeNumberValidator"], false)).toBe(true);
//         });
//     });

//     describe("isInvalid() tests", () => {
//         test('isInvalid() should return true if all validations were not successful', () => {
//             expect(res.isInvalid()).toBe(true);
//         });

//         test('isInvalid(false) should return the same result as isInvalid()', () => {
//             expect(res.isInvalid(false)).toBe(res.isInvalid());
//         });

//         test('isInvalid(false) should return false if all validations were not failed', () => {
//             expect(res.isInvalid(true)).toBe(false);
//         });

//         test('isInvalid(\'someValidatorId\') should return true if the specific validation was failed', () => {
//             expect(res.isInvalid('primeNumberValidator')).toBe(true);
//         });

//         test('isInvalid(\'someValidatorId\') should return false if the specific validation was successful', () => {
//             expect(res.isInvalid('oddNumberValidator')).toBe(false);
//         });

//         test('isInvalid(\'someValidatorId\') should return false if the specific validation was skipped', () => {
//             expect(res.isInvalid('lessThan100Validator')).toBe(false);
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\']) should return false if all the specified validations were not successful', () => {
//             expect(res.isInvalid(["oddNumberValidator", "primeNumberValidator"])).toBe(false);
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\']) should return true if all the specified validations were failed', () => {
//             expect(res.isInvalid(["primeNumberValidator"])).toBe(true);
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isInvalid([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isInvalid(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isInvalid(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isInvalid([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one of the validations specified was failed', () => {
//             expect(res.isInvalid(["oddNumberValidator", "primeNumberValidator"], false)).toBe(true);
//         });
//     });

//     describe("isValidated() tests", () => {

//         test('isValidated() should return false if all validators were not validated', () => {
//             expect(res.isValidated()).toBe(false);
//         });

//         test('isValidated(true) should return the same result as isValidated()', () => {
//             expect(res.isValidated(true)).toBe(res.isValidated());
//         });

//         test('isValidated(false) should return true if at least one of validators was validated', () => {
//             expect(res.isValidated(false)).toBe(true);
//         });

//         test('isValidated(\'someValidatorId\') should return true if the specific validator was validated', () => {
//             expect(res.isValidated('oddNumberValidator')).toBe(true);
//         });

//         test('isValidated(\'someValidatorId\') should return false if the specific validator was not validated', () => {
//             expect(res.isValidated('lessThan100Validator')).toBe(false);
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\']) should return true if the specified validators were validated', () => {
//             expect(res.isValidated(["oddNumberValidator", "primeNumberValidator"])).toBe(true);
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\']) should return false if all the specified validators were not validated', () => {
//             expect(res.isValidated(["oddNumberValidator", "lessThan100Validator"])).toBe(false);
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isValidated([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isValidated(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isValidated(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isValidated([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one of the validations specified were successful', () => {
//             expect(res.isValidated(["oddNumberValidator", "lessThan100Validator"], false)).toBe(true);
//         });

//     });

//     describe("isSkipped() tests", () => {

//         test('isSkipped() should return true if any one of the validators got skipped', () => {
//             expect(res.isSkipped()).toBe(true);
//         });

//         test('isSkipped(false) should return the same result as isSkipped()', () => {
//             expect(res.isSkipped(false)).toBe(res.isSkipped());
//         });

//         test('isSkipped(true) should return false if all validators were not skipped', () => {
//             expect(res.isSkipped(true)).toBe(false);
//         });

//         test('isSkipped(\'someValidatorId\') should return false if the specific validator was not skipped', () => {
//             expect(res.isSkipped('oddNumberValidator')).toBe(false);
//         });

//         test('isSkipped(\'someValidatorId\') should return false if the specific validator was the bailed point since it is not skipped', () => {
//             expect(res.isSkipped('primeNumberValidator')).toBe(false);
//         });

//         test('isSkipped(\'someValidatorId\') should return true if the specific validator was skipped', () => {
//             expect(res.isSkipped('lessThan100Validator')).toBe(true);
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\']) should return false all the specific validators were not skipped', () => {
//             expect(res.isSkipped(["oddNumberValidator", "primeNumberValidator"])).toBe(false);
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if all the validations specified were skipped', () => {
//             expect(res.isSkipped(["lessThan100Validator"])).toBe(true);
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'], true) should return the same result as isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'])', () => {
//             expect(res.isSkipped(["oddNumberValidator", "primeNumberValidator"], true)).toBe(res.isSkipped(["oddNumberValidator", "primeNumberValidator"]));
//         });

//         test('isSkipped([\'someValidatorId_1\', \'someValidatorId_2\'], false) should return true if at least one of the validations specified were skipped', () => {
//             expect(res.isSkipped(["oddNumberValidator", "lessThan100Validator"], false)).toBe(true);
//         });
//     });

//     //TODO: write tests for getPassedResults()
//     describe("getPassedResults() tests", () => {
//         test('getPassedResults() should return only the passed validator results if the validations have bailed at a point', () => {
//             expect(res.getPassedResults().map(v => v.validatorId)).toEqual(['oddNumberValidator']);
//         });
//     });

//     //TODO: write tests for getFailedResults()
//     describe("getFailedResults() tests", () => {
//         test('getFailedResults() should return only the failed validator result of the validation bailed at that point', () => {
//             expect(res.getFailedResults().map(v => v.validatorId)).toEqual(['primeNumberValidator']);
//         });
//     });

//     //TODO: write tests for getValidatedResults()
//     describe("getValidatedResults() tests", () => {
//         test('getValidatedResults() should return only the validated validator results (passed + failed) if the validations have bailed at a point', () => {
//             expect(res.getValidatedResults().map(v => v.validatorId)).toEqual(['oddNumberValidator', 'primeNumberValidator']);
//         });
//     });

//     describe("hasBailed() tests", () => {
//         test('hasBailed() should return true if the validations have bailed at a point', () => {
//             expect(res.hasBailed()).toBe(true);
//         });
//         test('hasBailed(\'someValidatorId\') should return true if the validations bailed at the specified validator', () => {
//             expect(res.hasBailed('primeNumberValidator')).toBe(true);
//         });
//         test('hasBailed([\'someValidatorId1\', \'someValidatorId2\']) should return true if the validations bailed at any one of the specified validators', () => {
//             expect(res.hasBailed(['oddNumberValidator', 'primeNumberValidator'])).toBe(true);
//         });
//         test('hasBailed([\'someValidatorId1\', \'someValidatorId2\']) should return false if the validations haven\'t bailed at any one of the specified validators', () => {
//             expect(res.hasBailed(['oddNumberValidator', 'lessThan100Validator'])).toBe(false);
//         });
//     });

//     describe("getBailedValidator() tests", () => {
//         test('getBailedValidator() should return the validator at which the validations bailed', () => {
//             expect(res.getBailedValidator()).toBe('primeNumberValidator');
//         });
//     });

//     describe("getBailedResult() tests", () => {
//         test('getBailedResult() should return empty array if all validators were validated', () => {
//             expect(res.getBailedResult().validatorId).toBe('primeNumberValidator');
//         });
//     });

// });

// describe('In createMultiValidator, for invalid odd number and valid prime number', () => {
//     let res;

//     beforeAll(()=>{
//         res = combinedOddAndPrimeValidator
//             .validate([2]);
//     });

//     test('should be invalid', () => {
//         expect(res.isValid()).toBe(false);
//     });
// });

// describe('combineValidators tests', () => {
//     let combinedNumValidator, combinedValidator, res;
//     beforeAll(() => {

//         combinedNumValidator = combineValidators([ oddNumberValidator, primeNumberValidator ], (results) => {
//             let valid = false;
//             let messages = createMessages([ 'success', 'errors', 'warnings' ], {
//                 success: {messagePattern: 'successfully validated'},
//                 error: {messagePattern: 'validation failed'},
//                 warningFor100: {messagePattern: 'Would be better if the number was less than 100'}
//             });
//             if(results.isValid(['oddNumberValidator', 'primeNumberValidator'])){
//                 valid = true;
//                 messages.pushMessage('success', 'success');
//             } else {
//                 messages.pushMessage('errors', 'error');
//             }
//             if(results.isInvalid('lessThan100Validator')) {
//                 messages.pushMessage('warnings', 'warningFor100')
//             }
//             return {
//                 valid,
//                 messages: messages,
//             }
//         });

//         combinedValidator = createValidator({
//             validator: combinedNumValidator,
//             validatorId: "combinedNumValidator",
//             messageCodes: ODD_MESSAGE_CODES,
//         });

//         res = combinedValidator.validate([21], true);

//     });
//     test('combine validators', () => {
//         console.log(res);
//         // expect(res)
//     });
// });