import FieldEditor from "./FieldEditor.jsx";
import AddField from "./AddField.jsx";
import Title from '../input-fields/Title.jsx'
import Description from '../input-fields/Description.jsx'
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import Btn from '../../../Generic/Btn.jsx'
import { LayoutGroup, motion} from "framer-motion";

FormEditor.propTypes = {
    form: PropTypes.any,
};

function FormEditor({form}) {

    const containerRef = useRef(null);
    const sidebarRef = useRef(null);
    const fieldRefs = useRef({});
    const fieldCountRef = useRef(Object.entries(form.schema.fields).length);
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        const currentFieldCount = Object.entries(form.schema.fields).length;

        if (currentFieldCount > fieldCountRef.current) {
            // A field was added → Trigger scrolling
            const lastFieldIndex = Object.keys(form.schema.fields).pop();
            const lastFieldRef = fieldRefs.current[lastFieldIndex];

            if (lastFieldRef) {
                setTimeout(() => {
                    lastFieldRef.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100); // Small delay to ensure proper rendering
            }
        }

        // Always update the field count for future checks
        fieldCountRef.current = currentFieldCount;
    }, [form.schema.fields]); // Runs only when fields change


    const handleFieldClick = (field) => {
        setActiveField(field);
    };

    const handleDeselect = (e) => {
        console.log("Deselect", e.target);
        // Only deselect if clicking outside an input field
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.stopPropagation();
            setActiveField(null);
        }
    };

    const handleContainerClick = (event) => {

        if (event.target === containerRef.current) {
            setActiveField(null);
        }
    };

    const handleClickAway = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target) &&
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target)
        ) {
            setActiveField(null);
            console.log("Clicked away");
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickAway);
        return () => {
            document.removeEventListener('mousedown', handleClickAway);
        };
    }, []);

    const handleFieldChange = (index, newValue) => {
        setActiveField(newValue);
        form.editField(index, newValue);
    };

    return (
        <>
            <div ref={containerRef}
                 onClick={handleContainerClick}
                 className="flex flex-col gap-4  flex-1  p-10 mx-8  min-h-full">
                <div onClick={handleDeselect} className="flex flex-col gap-4 px-16 h-full ">
                    <Title
                        error={!!form.errors?.title}
                        required
                        helperText={!!form.errors?.title}
                        value={form.schema.title}
                        onChange={(e) => {
                            form.setTitle(e.target.value)
                            form.resetError("title")
                        }}
                        placeholder="Untitled Form"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Description
                        value={form.schema.description}
                        onChange={(e) => form.setDescription(e.target.value)}
                        placeholder="Form Description"
                        multiline
                        rows={3}
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>

                    <LayoutGroup>


                {Object?.entries(form.schema.fields)?.map(([fieldIndex, field]) => (

                    <motion.div
                        ref={(el) => (fieldRefs.current[fieldIndex] = el)}
                        key={field.id}
                        layoutId={`field-${field.id}`} // Ensures smooth transitions
                        initial={{opacity: 0, scale: 0.9,}}
                        animate={{opacity: 1, scale: 1, }}
                        exit={{opacity: 0, scale: 0.9,}} // Moves up slightly before disappearing
                        transition={{duration: 0.2, ease: "easeInOut"}}
                    >
                        <FieldEditor
                            field={form.getField(fieldIndex)}
                            form={form}
                            onChange={handleFieldChange}
                            index={fieldIndex}
                            onActivate={() => handleFieldClick(field)}
                            active={activeField?.id === field.id}
                        />
                    </motion.div>

                ))}
                    </LayoutGroup>

                {Object.entries(form.schema.fields).length === 0 ? (
                    <div
                        className="flex flex-col justify-center gap-5 items-center text-lg font-semibold text-gray-600 mt-16">
                        <h5>Your form is empty. Click the button below to get started.</h5>
                        <Btn onClick={() => form.addField("text")}>Add a field</Btn>
                    </div>
                ) : <AddField onClick={() => form.addField("text")}/>

                }

            </div>

        </>
    );
}

export default FormEditor;
