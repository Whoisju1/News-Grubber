const getFetchedData = async (response: Response, defaultMessage: string = 'Something went wrong.') => {
  const isServerError = /^5\d{2}/.test(response.status.toString());
  if (isServerError) throw new Error(defaultMessage);
  const data = await response.json();
  if (!response.ok) {
    const hasErrorProp = Reflect.has(data, 'error');
    if (hasErrorProp && data.error !== null && data.error !== undefined) {
      throw new Error(data.error.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
  return data;
};

export default getFetchedData;
