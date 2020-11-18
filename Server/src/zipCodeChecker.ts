const zipcodeChecker = (customerZip: string): boolean  => {
    const validZipcodes = ["55555", "77777", "88888"];
    return validZipcodes.includes(customerZip);
}
export default zipcodeChecker