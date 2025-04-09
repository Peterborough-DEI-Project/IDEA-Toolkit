# Structures:  `formSchema` and `responseData` 
This document describes the structure of the `formSchema` and `responseData` used in the `FormSubmitter` component.
## **`formSchema` Structure** {id="formSchema"}
### **Purpose** {id="purpose_formSchema" }
Defines the structure and configuration of the form, including its metadata, fields, and validation rules.
### **Schema Example**
``` json
{
  "id": "UUID",
  "title": "String",
  "description": "String",
  "status": "draft | published",
  "fields": [
    {
      "id": "UUID",
      "type": "text | radioGroup | checkboxGroup | boolean",
      "title": "String",
      "description": "String",
      "options": [
        {
          "id": "UUID",
          "value": "String",
          "field_id": "UUID",
          "sequence_order": "Number"
        }
      ],
      "required": "Boolean",
      "sequence_order": "Number",
      "validation_rules": "Object | null"
    }
  ],
  "owner_id": "UUID",
  "created_at": "Timestamp",
  "updated_at": "Timestamp",
  "published_id": "String | null"
}
```
### **Key Fields** {id="key-fields_formSchema"}
#### **Root-Level**
- **`id`**: Unique identifier for the form.
- **`title`**: Name displayed as the form's title.
- **`description`**: Brief description of the form's purpose.
- **`status`**: Indicates if the form is in "draft" or "published". It is important to use these exact values as the column in Supabase is enumerated to these.
- **`fields`**: Array of field definitions (see below).
- **`owner_id`**: Unique ID of the form owner.
- **`created_at`** / **`updated_at`**: Timestamps for form metadata.

#### **`fields`**
An array of fields defining the form inputs.
- **`id`**: Unique ID for the field.
- **`type`**: Field type (e.g., `text`, `radioGroup`, `checkboxGroup`, `boolean`).
- **`title`**: Field label or question.
- **`description`**: Further details about the field.
- **`options`** (for `radioGroup` / `checkboxGroup`): An array of selectable options:
    - **`id`**: Unique ID of the option.
    - **`value`**: Display text for the option.
    - **`sequence_order`**: Sort order of the options.

- **`required`**: Boolean indicating whether the field is mandatory.
- **`sequence_order`**: Order in which fields appear in the form.
- **`validation_rules`**: Additional validation logic (optional).

## **`responseData` Structure** {id="responseData"}
### **Purpose** {id="purpose_responseData" }
Stores the user's responses to the form's fields, using a format synchronized with the `fields` from the `formSchema`.
### **Example**
``` json
[
  {
    "responseId": "UUID",
    "fieldId": "UUID",
    "title": "String",
    "type": "text",
    "value": ""
  },
  {
    "responseId": "UUID",
    "fieldId": "UUID",
    "title": "String",
    "type": "radioGroup",
    "value": "UUID of Selected Option"
  },
  {
    "responseId": "UUID",
    "fieldId": "UUID",
    "title": "String",
    "type": "checkboxGroup",
    "value": ["UUID of Selected Option 1", "UUID of Selected Option 2"]
  },
  {
    "responseId": "UUID",
    "fieldId": "UUID",
    "title": "String",
    "type": "boolean",
    "value": false
  }
]
```
### **Key Fields** {id="key-fields_responseData"}
- **`responseId`**: Unique identifier for the response.
- **`fieldId`**: Corresponds to the `id` of the field in `formSchema` that this response pertains to.
- **`title` **: Label of the associated field (for reference convenience).
- **`type`**: Field type (`text`, `radioGroup`, etc.).
- **`value`**: User-entered data. Format depends on the `type`:
    - **`text`**: String value.
    - **`radioGroup`**: `id` of the selected option.
    - **`checkboxGroup`**: Array of `id`s of selected options.
    - **`boolean`**: `true` or `false`.

## **Usage Notes**
### **Data Flow**
1. `formSchema` defines the form layout and logic.
2. `responseData` is generated dynamically based on the `fields` in `formSchema`.
3. Field interactions (e.g., user inputs) update `responseData` dynamically.

### **Expected Values**
- Ensure all `fieldId` values in `responseData` match `fields[].id` in `formSchema`.
- Types in `responseData` should strictly align with field types defined in `formSchema`.

### **Debugging**
- Use the `responseData`'s `value` to track user inputs for live validation or troubleshooting.
