import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomModal from '../CustomModal';
import Button from '../Button';

import "./customFormModal.scss";

const CustomFormModal = ({
  isOpen,
  setOpen,
  title,
  formData,
  formFields,
  onSubmit,
  onChange
}) => {
 
  return (
    <CustomModal isOpen={isOpen} setOpen={setOpen} title={title}>
      <form onSubmit={(e) => onSubmit(e)} className='addForm'>
        {formFields.map((field) => (
          <div key={field.name} className="form-input">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                id={field.name}
                rows="6"
                placeholder={field.placeholder}
                onChange={onChange}
                value={formData[field.name] || ''}
                required={field.required}
              ></textarea>
            ) : (
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                onChange={onChange}
                value={formData[field.name] || ''}
                required={field.required}
              />
            )}
          </div>
        ))}
        <Button type="submit">Gönder</Button>
      </form>
    </CustomModal>
  );
};

// CustomFormModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   formFields: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       label: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired,
//       placeholder: PropTypes.string.isRequired,
//       required: PropTypes.bool,
//     })
//   ).isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };

export default CustomFormModal;
