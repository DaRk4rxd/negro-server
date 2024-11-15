/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'teal-custom': '#387478', // color personalizado
      },
      borderWidth: {
        DEFAULT: '0px', // Sin borde por defecto
        '0': '0px',     // Clase 'border-0' para eliminar bordes
        '2': '2px',     // Clase 'border-2' con ancho de 2px
        '4': '4px',     // Clase 'border-4' con ancho de 4px
        // Puedes agregar otros valores según lo necesites
      },
    },
  },
  plugins: [],
};
