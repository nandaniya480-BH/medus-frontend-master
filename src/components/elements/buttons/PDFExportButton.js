import React from 'react';
import html2pdf from 'html2pdf.js';
import PropTypes from 'prop-types';

const PdfExportButton = ({ containerId, filename }) => {
  const exportToPDF = () => {
    const element = document.getElementById(containerId);
    if (element) {
      const opt = {
        margin: [5, -15, 10, -15],
        filename: `${filename}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2.5,
          scrollY: -window.scrollY,
          windowWidth: '2048px',
        },
        jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' },
      };

      html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <button className="text-primary-500 font-semibold" onClick={exportToPDF}>
      <i className="fa-solid fa-file-pdf fa-xl"></i> Als .PDF Herunterladen
    </button>
  );
};

PdfExportButton.propTypes = {
  containerId: PropTypes.string,
  filename: PropTypes.string,
};

export default PdfExportButton;
