import React, { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

// components
export default function ToastMessage({
  isSuccess = false,
  isError = false,
  successMessage = 'Daten erfolgreich gespeichert!',
  errorMessage = 'Etwas ist schief gelaufen!',
}) {
  useEffect(() => {
    if (isSuccess) {
      toast.success(successMessage);
    }
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isSuccess, isError]);

  return (
    <Toaster position="bottom-center" closeButton richColors duration={5000} />
  );
}
