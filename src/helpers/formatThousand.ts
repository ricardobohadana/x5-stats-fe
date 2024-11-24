export const formatThousands = (value: string): string => {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, '');
  
  // Format with dots separating thousands
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
