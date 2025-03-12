import CaseConverter from './CaseConverter.js'


// Takes an assessment object and splits it into 3 objects: metadata, fields, options (if field is a multi-select type)
// these objects correlate to the following tables: templates, template_fields, template_options
function prepareAssessmentForUpdate(data) {
    data = CaseConverter.fromJSON(data).toSnakeCase();
    let metadata = {};
    let fields, options = [];

    for (const key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) continue;
        const value = data[key];
        if (typeof value === 'string') {
            metadata[key] = value;
        } else if (key === 'fields') {

            // Filter out parameter 'options' -- to be added in seperate entry
            fields = data.fields.map((field) => {
                return Object.keys(field).filter((key) => key !== "options").reduce((acc, param) => {
                    acc[param] = field[param];
                    return acc;
                }, {});

            })

            // Map options into array
            options = data.fields.flatMap((field) => field.options?.map((option, index) => {
                if(option){
                    return{
                        ...option,
                        sequence_order: index,
                    }
                }
            })).filter(Boolean);

        }
    }
    return { metadata: metadata, fields: fields, options:options};
}

export {prepareAssessmentForUpdate};
