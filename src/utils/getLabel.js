
 const getLabel = (label) => {
  const customLabels = {
    username: "Full Name",
    instaLink: "Instagram",
    facebookLink: "Facebook",
    twitterLink: "Twitter",
    linkedinLink: "LinkedIn",
    licenseNumber: "License Number",
    licenseImg: "License Image",
    dob: "Date of Birth",
    pinCode: "Pin Code",
    emergencyName: "Emergency Name",
    emergencyContact: "Emergency Contact",

    // 🚗 Car fields
    carType: "Car Type",
    carName: "Car Name",
    plate: "Registration No",
    model: "Car Model",
    brand: "Car Brand",
    transmission: "Transmission",
    seating: "Seating Capacity",
    fuel: "Fuel Type",
    price: "Price",
    fuelCapacity: "Fuel Capacity",
    mileage: "Mileage",
    description: "Description",
    topSpeed: "Top Speed",
    discount: "Discount",
    carImages: "Car Images",
    mainImage: "Main Image",
    topImage: "Top Side",
    sideImage: "Back Side",
    insideImage: "Inside",
    licenseImg: "License Image",
    registrationImage: "Registration Image",
    insuranceImage: "Insurance Image",
    isAvailable: "Car Available",
    currentLocation: "Car Location",
    lastServiceDate: "Last Service Date",
    nextServiceDate: "Next Service Date",
    engien: "Engien No",
    chassis: "Chassis No",
    vin: "VIN (Vehicle Identification Number)",
    odoMeter: "Current Kms",
    fuleCapacity: "Fule Capacity (L)",
    bookingStatus : "Booking Status",
  };

  const autoFormat = label
    .replace(/([A-Z])/g, " $1") // split camelCase
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter

  return customLabels[label] || autoFormat;
};

export { getLabel };
