module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Enable dark mode using a class
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: '#4a90e2', // Light Blue
        'primary-dark': '#357ABD', // Darker Blue for hover
        secondary: '#d1d5db', // Light Grey
        background: '#ffffff', // White
        textPrimary: '#111827', // Dark Grey
        textSecondary: '#6b7280', // Grey
        border: '#e5e7eb', // Light Grey

        // Dark mode colors
        'dark-primary': '#2563eb', // Dark Blue
        'dark-primary-dark': '#1E4BB8', // Darker Blue for hover
        'dark-secondary': '#374151', // Dark Grey
        'dark-background': '#1f2937', // Dark Grey
        'dark-textPrimary': '#f3f4f6', // Light Grey
        'dark-textSecondary': '#9ca3af', // Grey
        'dark-border': '#4b5563', // Dark Grey
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
      fontSize: {
        base: '16px',
        large: '24px',
        xl: '32px', // Added for larger icons and buttons
      },
      fontWeight: {
        bold: 700,
        normal: 400,
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [],
};