export function createMultiDataValidator(validator) {
    function validate(multiData=[], bailOnFail=false) {
        const multiDataLength = multiData.length;
        let validDataIndices = [];
        let invalidDataIndices = [];
        let validatedDataIndices = [];
        let skippedDataIndices = {
            start: null,
            end: null,
        };
        let bailedIndex = null;
        let results = [];
        for(let i = 0 ; i < multiDataLength; i++) {
            results[i] = {
                validated: false,
                results: null,
            }
        }
        for(let i = 0; i < multiDataLength; i++) {
            const data = multiData[i];
            const result = validator.validate(data);
            results[i].results = result;
            results[i].validated = true;
            validatedDataIndices.push(i);
            if(result.isValid()) {
                validDataIndices.push(i);
            } else {
                invalidDataIndices.push(i);
                if (bailOnFail) {
                    if (i < multiDataLength - 1) {
                        bailedIndex = i;
                        skippedDataIndices = {
                            start: i + 1,
                            end: multiDataLength - 1,
                        };
                    }
                    break;
                }
            }
        }

        function getResults(dataIndex) {
            if (dataIndex){
                return results[dataIndex];
            } else {
                return results;
            }
        }

        function getPassedDataIndices() {
            return validDataIndices;
        }

        function getFailedDataIndices() {
            return invalidDataIndices;
        }

        function getValidatedDataIndices() {
            return validatedDataIndices;
        }

        function getSkippedDataIndices() {
            return skippedDataIndices;
        }

        function isValid(dataList, every = true) {
            if(arguments.length === 0) {
                return multiDataLength === validDataIndices.length;
            } else if (Array.isArray(dataList)) {
                const iterate = every ? 'every' : 'some';
                return dataList[iterate](dataIndex => validDataIndices.includes(dataIndex));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? multiDataLength === validDataIndices.length : validDataIndices.length > 0;
            } else {
                return validDataIndices.includes(arguments[0]);
            }

        }

        function isInvalid(dataList, every = true) {
            if(arguments.length === 0) {
                return invalidDataIndices.length > 0;
            } else if (Array.isArray(dataList)) {
                const iterate = every ? 'every' : 'some';
                return dataList[iterate](dataIndex => invalidDataIndices.includes(dataIndex));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? multiDataLength === invalidDataIndices.length : invalidDataIndices.length > 0;
            } else {
                return invalidDataIndices.includes(arguments[0]);
            }
        }

        function isValidated(dataList, every = true) {
            if(arguments.length === 0) {
                return multiDataLength === validatedDataIndices.length;
            } else if (Array.isArray(dataList)) {
                const iterate = every ? 'every' : 'some';
                return dataList[iterate](dataIndex => validatedDataIndices.includes(dataIndex));
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? multiDataLength === validatedDataIndices.length : validatedDataIndices.length > 0;
            } else {
                return validatedDataIndices.includes(arguments[0]);
            }
        }

        function isSkipped(dataList, every = true) {
            if(arguments.length === 0) {
                return skippedDataIndices.start !== null;
            } else if (Array.isArray(dataList)) {
                const iterate = every ? 'every' : 'some';
                return dataList[iterate](dataIndex => dataIndex > bailedIndex);
            } else if(typeof arguments[0] === "boolean") {
                return arguments[0] ? skippedDataIndices.start === 0 : skippedDataIndices.start !== null;
            } else {
                return arguments[0] >= skippedDataIndices.start;
            }
        }

        function getPassedResults() {
            return getPassedDataIndices()
                .map(passedDataIndex => results[passedDataIndex].results);
        }

        function getFailedResults() {
            return getFailedDataIndices()
                .map(failedDataIndex => results[failedDataIndex].results);
        }

        function getValidatedResults() {
            return getValidatedDataIndices()
                .map(validatedDataIndex => results[validatedDataIndex].results);
        }

        /**
         * If no params, returns whether a bail has happened or not.
         * If the param is an integer, returns if that integer is the index of bailed data.
         * If param is an array, returns whether any  of the integer inside the array the bailed data index.
         */
        function hasBailed(dataList=[]) {
            if(arguments.length === 0){
                return bailedIndex !== null;
            } else if(Array.isArray(arguments[0])) {
                return dataList.some(possiblyBailedDataIndex => possiblyBailedDataIndex === bailedIndex);
            }
            return dataList === bailedIndex;
        }

        function getBailedValidator() {
            return bailedIndex ? bailedIndex : null;
        }

        function getBailedResult() {
            return bailedIndex ? results[bailedIndex].results : null;
        }

        return {
            getResults,
            getPassedDataIndices,
            getFailedDataIndices,
            getValidatedDataIndices,
            getSkippedDataIndices,
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

    return { validate };

}