export default {
  nominal: (value) => {
    if (value !== null && value !== undefined) {
      let a = value.toFixed(2).toString();
      
      let [integerPart, decimalPart] = a.split(".");
      
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      return `${integerPart},${decimalPart}`;
    }
    return '';
  }
}