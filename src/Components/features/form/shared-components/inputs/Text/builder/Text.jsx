import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import {Label, TextInput} from 'flowbite-react';
import {AnimatePresence, motion} from "framer-motion";

Text.propTypes = {
  field: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  editorMode: PropTypes.bool,
};

function Text({ field, onChange, editorMode = false }) {
  const multiline = field.validationRules?.find(
    (option) => option.id === "multiline",
  ).value;
  return (
      <AnimatePresence mode="wait">
          <motion.div
              layout
              key={field.type} // Ensures animations only occur when the type changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ width: "100%" }}
          >

              <TextInput
                  onChange={onChange}
                  placeholder={"Input"}
                  disabled={editorMode}
                  sizing=""
                  type="text"
              />
          </motion.div>
      </AnimatePresence>


  );
}

export default Text;
