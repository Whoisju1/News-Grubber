const getFetchedData = async (response: Response, defaultMessage: string = 'Something went wrong.') => {
  // define generic error
  const genericError = new Error(defaultMessage);
  // find out if the status code is in the 500 (Server Error) range
  const isServerError = /^5\d{2}/.test(response.status.toString());
  // If it is throw a generic Error
  if (isServerError) throw genericError;
  const data = await response.json();
  // check if request was successful
  if (!response.ok) {
    // if it isn't successful check if there's an error property on the payload
    const hasErrorProp = Reflect.has(data, 'error');
    // if there's an error prop make sure it's truthy
    if (hasErrorProp && data.error !== null && data.error !== undefined) {
      // if it is throw an error with the message of the error ...
      // and if there's no message throw replace the message with a generic message
      throw new Error(data.error.message || defaultMessage);
    } else {
      // if there's no error prop throw an error with a generic message
      throw genericError;
    }
  }
  return data;
};

export default getFetchedData;
