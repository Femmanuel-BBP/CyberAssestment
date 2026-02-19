import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejar localStorage con React state
 * @param {string} key - Clave de localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {[any, Function, Function]} [valor, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = useCallback((value) => {
    try {
      // Permite pasar una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Función para eliminar el valor
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
