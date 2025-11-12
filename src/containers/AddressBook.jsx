import axios from "axios";
import { DeleteIcon, EditIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { localHost, renderAPI } from "../constants";
import { AddressBookSkeleton } from "./AddressSkeleton";

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const AddressBook = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address1: "",
    address2: "",
    phone: "",
    city: "",
    region: "",
    postalCode: "",
    mainAddress: false,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingAddresses, setFetchingAddresses] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const formRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem("bj_userData"));
  const token = userData?.token;

  const mainAddress = addresses.find((address) => address.isDefault === true);

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.address1) newErrors.address1 = "Address line 1 is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.region) newErrors.region = "State is required.";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      line1: formData.address1,
      line2: formData.address2,
      city: formData.city,
      state: formData.region,
      postalCode: formData.postalCode,
      isDefault: formData.mainAddress,
    };

    try {
      if (editingAddress) {
        // Editing existing address
        const { data: updatedAddress } = await axios.put(
          `${
            location.origin.includes("localhost") ? localHost : renderAPI
          }/api/user/address/${editingAddress}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Update the local state instantly
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress ? updatedAddress : addr
          )
        );
      } else {
        // Adding new address
        const { data: newAddresses } = await axios.post(
          `${
            location.origin.includes("localhost") ? localHost : renderAPI
          }/api/user/address`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Replace with latest addresses (or append last item)
        setAddresses(newAddresses);
      }

      // Reset form
      setAddNew(false);
      setEditingAddress(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address1: "",
        address2: "",
        phone: "",
        city: "",
        region: "",
        postalCode: "",
        mainAddress: false,
      });
    } catch (err) {
      console.error(err);
      setErrors({ general: "Failed to save address." });
    } finally {
      setLoading(false);
    }
  };

  const getAddresses = async (e) => {
    setFetchingAddresses(true);
    try {
      const response = await axios.get(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/user/addresses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddresses(response.data);
      setFetchingAddresses(false);
      return response.data; // array of addresses
    } catch (err) {
      setFetchingAddresses(false);
      console.error("Failed to fetch addresses:", err);
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address.id); // id of the address being edited
    setAddNew(true);
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      email: address.email,
      address1: address.line1,
      address2: address.line2,
      phone: address.phone,
      city: address.city,
      region: address.state,
      postalCode: address.postalCode,
      mainAddress: address.isDefault,
    });

    // Focus first input
    setTimeout(() => {
      document.getElementsByName("firstName")[0]?.focus();
    }, 0);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;

    try {
      await axios.delete(
        `${
          location.origin.includes("localhost") ? localHost : renderAPI
        }/api/user/address/${addressToDelete}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove it instantly from local state
      setAddresses((prev) =>
        prev.filter((addr) => addr.id !== addressToDelete)
      );
    } catch (err) {
      console.error("Failed to delete address:", err);
    } finally {
      setShowDeleteModal(false);
      setAddressToDelete(null);
    }
  };

  return fetchingAddresses ? (
    <AddressBookSkeleton />
  ) : (
    <div className="px-4 montserrat md:px-16 lg:px-24">
      <p className="montserrat text-lg font-semibold ">ADDRESS BOOK</p>
      <div className="mt-4 flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          {mainAddress !== undefined && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="font-semibold">MAIN ADDRESS</p>

              <div className="mt-4 text-sm text-zinc-300">
                <p>
                  {mainAddress?.firstName} {mainAddress?.lastName}
                </p>
                <p>{mainAddress?.line1}</p>
                {mainAddress?.line2 && <p>{mainAddress?.line2}</p>}
                <p>
                  {mainAddress?.postalCode} {mainAddress?.state}
                </p>
                <p>{mainAddress?.email}</p>
                <p>{mainAddress?.phone}</p>
                {/* <p>Nigeria</p> */}
              </div>
            </div>
          )}

          <button
            className="flex gap-2 bg-blue-900 m-auto mt-4 font-semibold px-6 py-2 rounded-3xl"
            onClick={() => {
              setAddNew(true);
            }}
          >
            <PlusIcon />
            <p>ADD AN ADDRESS</p>
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {addNew && (
            <div
              className="border-2 border-zinc-800 p-4 flex flex-col gap-4"
              ref={formRef}
            >
              <form className="flex flex-col gap-4">
                {/* Name fields */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {touched.address1 && errors.address1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address1}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* City and State */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.city && errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select a state</option>
                      {nigerianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {touched.region && errors.region && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.region}
                      </p>
                    )}
                  </div>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {touched.postalCode && errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer mt-2">
                  <input
                    type="checkbox"
                    name="mainAddress"
                    checked={formData.mainAddress}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  Make this my main
                </label>

                {/* Buttons */}
                <div className="flex flex-row gap-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className={`mt-4 text-white py-2 rounded-3xl px-8 transition-colors ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : isValid
                        ? "bg-blue-900 hover:bg-blue-800"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="mt-4 bg-gray-800 text-white py-2 rounded-3xl hover:bg-blue-800 transition-colors px-8"
                    onClick={() => {
                      setAddNew(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {addresses.length < 1 && (
            <div className="text-center">
              <p className="font-semibold">ADDRESS BOOK IS EMPTY</p>
              <p className="mt-2 text-sm text-zinc-400">
                Add addresses to your address book and you'll be able to
                checkout faster
              </p>
            </div>
          )}

          {addresses?.map((address) => (
            <div
              key={address.id}
              className="border-2 border-zinc-800 p-4 flex flex-col gap-8 md:flex-row justify-between"
            >
              <div className="text-zinc-300">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.line1}</p>
                <p>{address.line2}</p>
                <p>
                  {address.postalCode} {address.state}
                </p>
                <p>{address.email}</p>
                <p>{address.phone}</p>
              </div>

              <div className="flex flex-col gap-2 font-semibold">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex items-center underline gap-2 text-sm"
                >
                  <EditIcon size={15} />
                  <p>Edit</p>
                </button>

                <button
                  onClick={() => {
                    setAddressToDelete(address.id);
                    setShowDeleteModal(true);
                  }}
                  className="flex items-center underline gap-2 text-sm"
                >
                  <DeleteIcon size={15} />
                  <p>Delete</p>
                </button>

                {!address.isDefault && (
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      id="main"
                      className="accent-blue-600"
                    />
                    Make this my main
                  </label>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm animate-fadeIn">
            <h3 className="text-lg font-semibold mb-3">Delete Address?</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Are you sure you want to delete this address? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setAddressToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete()}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
