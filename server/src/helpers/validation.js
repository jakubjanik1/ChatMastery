import { validationResult } from 'express-validator';

export function isValidate(req) {
    const errors = validationResult(req);
    
    return ! errors.array().filter(err => err.msg != 'Invalid value').length;
}

export function getValidationErrors(req) {
    const parseErrors = errors => {
        const result = {};
        errors.map(err => {
            if (err.msg != 'Invalid value') {
                result[err.param] = err.msg
            }
        });

        return result;
    };

    const errors = validationResult(req);
    return { errors: parseErrors(errors.array()) };
}