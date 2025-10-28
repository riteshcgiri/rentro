// profileConfig.js
import Locations from "../Db/locationData";
import Countries from "../Db/countries";

const profileSections = [
  {
    id: "personal",
    heading: "Personal Information",
    step: 1,
    fields: [
      { label: "username", type: "text", placeholder: "Enter your Name", required: true },
      { label: "email", type: "email", placeholder: "Enter your Email", required: true },
      { label: "phone", type: "number", placeholder: "Enter your Phone Number", required: true },
      { label: "gender", type: "radio", options: ["Male", "Female"], required: false },
      { label: "emergencyName", type: "text", placeholder: "Emergency Name" },
      { label: "emergencyContact", type: "number", placeholder: "Emergency Number" },
      { label: "relation", type: "select", options: ["Father", "Mother", "Sibling", "Spouse", "Friend"] },
    ],
  },
  {
    id: "billing",
    heading: "Billing Information",
    step: 2,
    fields: [
      { label: "address", type: "text", placeholder: "Enter your Address" },
      { label: "city", type: "text", placeholder: "Enter your City" },
      { label: "state", type: "select", options: Locations },
      { label: "country", type: "select", options: Countries.map(c => c.name) },
      { label: "pinCode", type: "number", placeholder: "Enter Pin" },
    ],
  },
  {
    id: "social",
    heading: "Social Links",
    step: 3,
    fields: [
      { label: "instaLink", type: "url", placeholder: "Instagram Link" },
      { label: "facebookLink", type: "url", placeholder: "Facebook Link" },
      { label: "twitterLink", type: "url", placeholder: "Twitter Link" },
      { label: "linkedinLink", type: "url", placeholder: "LinkedIn Link" },
    ],
  },
  {
    id: "documents",
    heading: "Documents",
    step: 4,
    fields: [
      { label: "licenseNumber", type: "text", placeholder: "License Number" },
      { label: "dob", type: "date", placeholder: "Date of Birth" },
      { label: "licenseImg", type: "file", placeholder: "Upload License Image" },
    ],
  },
];


export default profileSections;