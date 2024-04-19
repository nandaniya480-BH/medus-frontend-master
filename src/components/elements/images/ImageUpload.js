import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';

const ImageUpload = forwardRef(
  ({ placeholder, changeButton, removeButton, onChange, onRemove }, ref) => {
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(placeholder);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        setFile(file);
        setImagePreviewUrl(reader.result);
        onChange(file, reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const handleClick = () => {
      fileInputRef.current.click();
    };

    const handleRemove = () => {
      setFile(null);
      setImagePreviewUrl(placeholder);
      onRemove();
      fileInputRef.current.value = null;
    };

    useImperativeHandle(ref, () => ({
      clearValue: () => {
        setFile(null);
        setImagePreviewUrl(placeholder);
        fileInputRef.current.value = null;
      },
    }));

    return (
      <>
        <div className="text-center">
          <input
            className="hidden"
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {imagePreviewUrl !== '' && (
            <div className="rounded-lg mx-auto w-7/12 mb-4">
              <img
                className="object-cover w-full h-full rounded-lg"
                src={imagePreviewUrl}
                alt="..."
              />
            </div>
          )}
        </div>
        <small className="font-semibold font-[14px]">
          Bitte laden Sie das Logo der Unternehmung hoch (.JPG , .PNG max 2 MB)
        </small>
        <div className="w-full flex flex-col">
          <button {...changeButton} onClick={handleClick}>
            <i className="fa-solid fa-upload mr-1"></i>
            {file ? (
              <>
                Ändern <br />
                <span className="text-primary-500 text-sm">
                  <i className="fa-solid fa-image mr-1"></i> {file?.name}
                </span>
              </>
            ) : (
              changeButton?.children
            )}
          </button>

          {imagePreviewUrl === '' ? (
            ''
          ) : (
            <button {...removeButton} onClick={handleRemove}>
              <i className="fa-solid fa-rotate mr-1"></i>
              {removeButton?.children}
            </button>
          )}
        </div>
      </>
    );
  }
);

ImageUpload.defaultProps = {
  changeButton: {},
  onChange: () => {},
  onRemove: () => {},
};

ImageUpload.propTypes = {
  placeholder: PropTypes.string,
  changeButton: PropTypes.object,
  removeButton: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

export default ImageUpload;
