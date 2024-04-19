export const selectPickerClassNames = {
  menuButton: ({ isDisabled }) =>
    `flex text-[13px] text-gray-500 child:flex-nowrap border-b shadow-sm cursor-pointer overflow-hidden transition-all duration-300 active:outline-none outline-none focus:outline-none ${
      isDisabled ? 'bg-gray-200' : 'bg-whte overflow-x-auto'
    }`,
  menu: `absolute z-10 w-full bg-white shadow-lg border rounded-lg py-1 mt-1.5 text-sm text-black overflow-x-auto`,
  listItem: ({ isSelected }) =>
    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
      isSelected
        ? `text-white bg-gradient-to-r from-primary-200 to-primary-regular`
        : `text-gray-500`
    }`,
  tagItem: () =>
    `bg-gradient-to-r from-primary-200 to-primary-regular font-semibold rounded-lg flex space-x-1 pl-1 text-[12px] px-1`,
  tagItemText: 'text-white my-auto mx-2',
  tagItemIconContainer: 'text-white my-auto ',
  noOptionsMessage: 'Keine weiteren Optionen',
};
