export const replaceParams = (path, params = {}) => Object.keys(params)
    .reduce((prev, next) => prev.replace(new RegExp(`:${next}`, 'g'), params[next]), path);
