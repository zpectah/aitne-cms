export const capitalizeString = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const validateEmail = (email: string) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

export const isEmailValid = (email: string) => !!validateEmail(email);

export const getTimestamp = () => {
  const now = new Date();

  return now.toISOString();
};
