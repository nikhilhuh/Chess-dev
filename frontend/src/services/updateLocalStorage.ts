export const updateLocalStorage = (key: string, value: any) => {
  localStorage.setItem(
    key,
    typeof value === "string" ? value : JSON.stringify(value)
  );

  const event = new Event("storage");
  window.dispatchEvent(event);
};
