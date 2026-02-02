import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Modal } from "react-bootstrap";
import {
  User,
  MapPin,
  Settings,
  Edit2,
  Trash2,
  Plus,
  Lock,
  Save,
  X,
  Home,
  Building2,
  Map,
  Navigation,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/api";

const AddressFormFields = ({ formData, onChange, errors, indianStates }) => (
  <>
    <Form.Group className="mb-3">
      <Form.Label
        className="fw-semibold d-flex align-items-center gap-2"
        style={{ color: "#1e293b" }}
      >
        <Home size={18} color="#1e40af" />
        House/Flat Number <span style={{ color: "#EF4444" }}>*</span>
      </Form.Label>
      <Form.Control
        type="text"
        value={formData.homeNo}
        onChange={(e) => onChange("homeNo", e.target.value)}
        placeholder="e.g., A-101, Building 5"
        isInvalid={!!errors.homeNo}
        style={{
          borderRadius: "8px",
          border: "2px solid #e2e8f0",
          padding: "0.75rem",
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errors.homeNo}
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label
        className="fw-semibold d-flex align-items-center gap-2"
        style={{ color: "#1e293b" }}
      >
        <Building2 size={18} color="#1e40af" />
        Area/Town <span style={{ color: "#EF4444" }}>*</span>
      </Form.Label>
      <Form.Control
        type="text"
        value={formData.town}
        onChange={(e) => onChange("town", e.target.value)}
        placeholder="e.g., Koramangala"
        isInvalid={!!errors.town}
        style={{
          borderRadius: "8px",
          border: "2px solid #e2e8f0",
          padding: "0.75rem",
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errors.town}
      </Form.Control.Feedback>
    </Form.Group>

    <div className="row">
      <div className="col-md-6">
        <Form.Group className="mb-3">
          <Form.Label
            className="fw-semibold d-flex align-items-center gap-2"
            style={{ color: "#1e293b" }}
          >
            <Navigation size={18} color="#1e40af" />
            City <span style={{ color: "#EF4444" }}>*</span>
          </Form.Label>
          <Form.Control
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="e.g., Bangalore"
            isInvalid={!!errors.city}
            style={{
              borderRadius: "8px",
              border: "2px solid #e2e8f0",
              padding: "0.75rem",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="col-md-6">
        <Form.Group className="mb-3">
          <Form.Label
            className="fw-semibold d-flex align-items-center gap-2"
            style={{ color: "#1e293b" }}
          >
            <Map size={18} color="#1e40af" />
            State <span style={{ color: "#EF4444" }}>*</span>
          </Form.Label>
          <Form.Select
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            isInvalid={!!errors.state}
            style={{
              borderRadius: "8px",
              border: "2px solid #e2e8f0",
              padding: "0.75rem",
            }}
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>

    <Form.Group className="mb-3">
      <Form.Label
        className="fw-semibold d-flex align-items-center gap-2"
        style={{ color: "#1e293b" }}
      >
        <MapPin size={18} color="#1e40af" />
        Pincode <span style={{ color: "#EF4444" }}>*</span>
      </Form.Label>
      <Form.Control
        type="text"
        value={formData.pincode}
        onChange={(e) => onChange("pincode", e.target.value)}
        placeholder="e.g., 560001"
        maxLength={6}
        isInvalid={!!errors.pincode}
        style={{
          borderRadius: "8px",
          border: "2px solid #e2e8f0",
          padding: "0.75rem",
        }}
      />
      <Form.Control.Feedback type="invalid">
        {errors.pincode}
      </Form.Control.Feedback>
      <Form.Text className="text-muted">Enter 6-digit postal code</Form.Text>
    </Form.Group>
  </>
);

const ConsumerProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Get consumer ID from session storage
  const consumerId = JSON.parse(sessionStorage.getItem("user")).userId;

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    userStatus: "",
    rewardPoints: 0,
    address: [],
    languages: [],
  });

  const [editProfileData, setEditProfileData] = useState({});

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Address modals
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [addressFormData, setAddressFormData] = useState({
    homeNo: "",
    town: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [addressErrors, setAddressErrors] = useState({});

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Lakshadweep",
    "Andaman and Nicobar",
  ];

  // Fetch profile data
  useEffect(() => {
    fetchProfileData();
  }, [consumerId]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/consumer/profile/${consumerId}`,
      );
      console.log("✅ Profile data fetched:", response.data);

      setProfileData(response.data);
      setEditProfileData({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        phoneNumber: response.data.phone,
      });
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      toast.error("Failed to load profile data");
      setLoading(false);
    }
  };

  // ==================== PROFILE EDITING ====================
  const handleProfileChange = (field, value) => {
    setEditProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      if (!editProfileData.firstName || !editProfileData.lastName) {
        toast.error("First name and last name are required");
        return;
      }
      if (!editProfileData.email || !editProfileData.phoneNumber) {
        toast.error("Email and phone are required");
        return;
      }

      // Prepare request body to match backend format
      const requestBody = {
        firstName: editProfileData.firstName,
        lastName: editProfileData.lastName,
        email: editProfileData.email,
        phoneNumber: editProfileData.phoneNumber, // Backend expects "phoneNumber"
        dateOfBirth: profileData.dob, // Include dob from profile data
        languages: profileData.languages || [], // Include languages
      };

      const response = await api.put(
        `/consumer/edit/${consumerId}`,
        requestBody,
      );

      console.log("✅ Profile updated:", response.data);
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
      fetchProfileData();
    } catch (error) {
      console.error("❌ Error updating profile:", error);

      const data = error.response?.data;

      if (data?.errors && Array.isArray(data.errors)) {
        // show each validation error
        data.errors.forEach((err) => {
          toast.error(err.defaultMessage);
        });
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    }
  };

  // ==================== PASSWORD CHANGE ====================
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await api.request({
        url: `/user/${consumerId}/password`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          newPassword: passwordData.newPassword,
          role: "CONSUMER",
        },
      });

      console.log("✅ Password changed:", response.data);
      toast.success("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("❌ Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  // ==================== ADD ADDRESS ====================
  const validateAddressForm = () => {
    const errors = {};

    if (!addressFormData.homeNo.trim()) {
      errors.homeNo = "House/Flat number is required";
    }
    if (!addressFormData.town.trim()) {
      errors.town = "Area/Town is required";
    }
    if (!addressFormData.city.trim()) {
      errors.city = "City is required";
    }
    if (!addressFormData.state) {
      errors.state = "State is required";
    }
    if (!/^\d{6}$/.test(addressFormData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAddress = async () => {
    if (!validateAddressForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const response = await api.post(
        `/consumer/add-address/${consumerId}`,
        addressFormData,
      );

      console.log("✅ Address added:", response.data);
      toast.success("Address added successfully!");
      setShowAddAddressModal(false);
      setAddressFormData({
        homeNo: "",
        town: "",
        city: "",
        state: "",
        pincode: "",
      });
      setAddressErrors({});
      fetchProfileData();
    } catch (error) {
      console.error("❌ Error adding address:", error);
      toast.error(error.response?.data?.message || "Failed to add address");
    }
  };

  // ==================== EDIT ADDRESS ====================
  const openEditAddressModal = (address, index) => {
    setSelectedAddress(address);
    setAddressFormData({
      homeNo: address.homeNo,
      town: address.town,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    setShowEditAddressModal(true);
  };

  const handleEditAddress = async () => {
    if (!validateAddressForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      // Backend expects /consumer/edit-address/{aid}
      const addressId = selectedAddress.addressId;


      const response = await api.put(
        `/consumer/edit-address/${addressId}`,
        addressFormData,
      );

      console.log("✅ Address updated:", response.data);
      toast.success("Address updated successfully!");
      setShowEditAddressModal(false);
      setSelectedAddress(null);
      setAddressFormData({
        homeNo: "",
        town: "",
        city: "",
        state: "",
        pincode: "",
      });
      setAddressErrors({});
      fetchProfileData();
    } catch (error) {
      console.error("❌ Error updating address:", error);
      toast.error(error.response?.data?.message || "Failed to update address");
    }
  };

  // ==================== DELETE ADDRESS ====================
  const openDeleteAddressModal = (address, index) => {
    setSelectedAddress(address);
    setShowDeleteAddressModal(true);
  };

  const handleDeleteAddress = async () => {
    try {
      // Backend expects /delete-address/{aid}
      const addressId = selectedAddress.addressId;

      const response = await api.delete(
        `/consumer/delete-address/${addressId}`,
      );

      console.log("✅ Address deleted:", response.data);
      toast.success("Address deleted successfully!");
      setShowDeleteAddressModal(false);
      setSelectedAddress(null);
      fetchProfileData();
    } catch (error) {
      console.error("❌ Error deleting address:", error);
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  if (loading) {
    return (
      <Container
        fluid
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="spinner-border"
          style={{ color: "#1e40af" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  // ==================== RENDER FUNCTIONS ====================
  const renderPersonalInfo = () => {
    const initials =
      `${profileData.firstName?.[0] || ""}${profileData.lastName?.[0] || ""}`.toUpperCase();
    const displayData = isEditingProfile ? editProfileData : profileData;

    return (
      <div style={{ padding: "2rem" }}>
        <div className="text-center mb-4">
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3rem",
              fontWeight: 700,
              border: "4px solid #bfdbfe",
            }}
          >
            {initials}
          </div>
          <h4 className="mt-3 fw-bold" style={{ color: "#1e293b" }}>
            {profileData.firstName} {profileData.lastName}
          </h4>
          <p className="text-muted">{profileData.email}</p>
        </div>

        <h5
          className="fw-bold mb-4"
          style={{
            color: "#1e293b",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "0.75rem",
          }}
        >
          Basic Information
        </h5>

        <div className="row g-3">
          <div className="col-md-6">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              First Name
            </label>
            {isEditingProfile ? (
              <Form.Control
                type="text"
                value={displayData.firstName}
                onChange={(e) =>
                  handleProfileChange("firstName", e.target.value)
                }
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "0.75rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
              >
                {profileData.firstName}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              Last Name
            </label>
            {isEditingProfile ? (
              <Form.Control
                type="text"
                value={displayData.lastName}
                onChange={(e) =>
                  handleProfileChange("lastName", e.target.value)
                }
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "0.75rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
              >
                {profileData.lastName}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              Email Address
            </label>
            {isEditingProfile ? (
              <Form.Control
                type="email"
                value={displayData.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "0.75rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
              >
                {profileData.email}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              Phone Number
            </label>
            {isEditingProfile ? (
              <Form.Control
                type="tel"
                value={displayData.phoneNumber}
                onChange={(e) =>
                  handleProfileChange("phoneNumber", e.target.value)
                }
                style={{
                  borderRadius: "8px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "0.75rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  color: "#1e293b",
                }}
              >
                {profileData.phone}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              Date of Birth
            </label>
            <div
              style={{
                padding: "0.75rem",
                background: "#f8fafc",
                borderRadius: "8px",
                color: "#1e293b",
              }}
            >
              {profileData.dob}
            </div>
          </div>

          <div className="col-md-6">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              Reward Points
            </label>
            <div
              style={{
                padding: "0.75rem",
                background: "#f8fafc",
                borderRadius: "8px",
                color: "#1e293b",
              }}
            >
              ⭐ {profileData.rewardPoints} points
            </div>
          </div>

          <div className="col-12">
            <label
              className="fw-semibold mb-2"
              style={{ color: "#1e293b", fontSize: "0.9rem" }}
            >
              Account Status
            </label>
            <div
              style={{
                padding: "0.75rem",
                background: "#f8fafc",
                borderRadius: "8px",
              }}
            >
              <span
                className="badge"
                style={{
                  background:
                    profileData.userStatus === "ACTIVE" ? "#d1fae5" : "#fee2e2",
                  color:
                    profileData.userStatus === "ACTIVE" ? "#10B981" : "#EF4444",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {profileData.userStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex gap-2 justify-content-end">
          {!isEditingProfile ? (
            <Button
              onClick={() => setIsEditingProfile(true)}
              style={{
                background: "#1e40af",
                border: "none",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
              }}
            >
              <Edit2 size={18} className="me-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIsEditingProfile(false);
                  setEditProfileData({
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    email: profileData.email,
                    phoneNumber: profileData.phone,
                  });
                }}
                style={{
                  background: "#ffffff",
                  color: "#64748b",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  fontWeight: 600,
                }}
              >
                <X size={18} className="me-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                style={{
                  background: "#10B981",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  fontWeight: 600,
                }}
              >
                <Save size={18} className="me-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderAddresses = () => (
    <div style={{ padding: "2rem" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
          My Addresses
        </h5>
        <Button
          onClick={() => setShowAddAddressModal(true)}
          style={{
            background: "#1e40af",
            border: "none",
            borderRadius: "8px",
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
          }}
        >
          <Plus size={18} className="me-2" />
          Add Address
        </Button>
      </div>

      {profileData.address && profileData.address.length > 0 ? (
        <div className="row g-3">
          {profileData.address.map((addr, index) => (
            <div key={index} className="col-md-6">
              <Card
                className="border-0 shadow-sm h-100"
                style={{ borderRadius: "12px", border: "2px solid #e2e8f0" }}
              >
                <Card.Body style={{ padding: "1.5rem" }}>
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        background: "#dbeafe",
                        borderRadius: "10px",
                        border: "2px solid #bfdbfe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MapPin size={24} color="#1e40af" />
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-2" style={{ color: "#1e293b" }}>
                        Address {index + 1}
                      </h6>
                      <p className="mb-1 text-muted small">{addr.homeNo}</p>
                      <p className="mb-1 text-muted small">{addr.town}</p>
                      <p className="mb-0 text-muted small">
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => openEditAddressModal(addr, index)}
                      style={{
                        background: "#ffffff",
                        color: "#1e40af",
                        border: "2px solid #1e40af",
                        borderRadius: "6px",
                        padding: "0.5rem 1rem",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        flex: 1,
                      }}
                    >
                      <Edit2 size={14} className="me-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => openDeleteAddressModal(addr, index)}
                      style={{
                        background: "#ffffff",
                        color: "#EF4444",
                        border: "2px solid #EF4444",
                        borderRadius: "6px",
                        padding: "0.5rem 1rem",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        flex: 1,
                      }}
                    >
                      <Trash2 size={14} className="me-1" />
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <MapPin size={64} color="#d1d5db" className="mb-3" />
          <p className="text-muted">No addresses added yet</p>
          <Button
            onClick={() => setShowAddAddressModal(true)}
            style={{
              background: "#1e40af",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
              marginTop: "1rem",
            }}
          >
            <Plus size={18} className="me-2" />
            Add Your First Address
          </Button>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div style={{ padding: "2rem" }}>
      <h5
        className="fw-bold mb-4"
        style={{
          color: "#1e293b",
          borderBottom: "2px solid #e2e8f0",
          paddingBottom: "0.75rem",
        }}
      >
        Account Settings
      </h5>

      <div className="mb-4">
        <h6 className="fw-bold mb-3" style={{ color: "#1e293b" }}>
          Security
        </h6>
        <Card
          className="border-0"
          style={{
            background: "#f8fafc",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="fw-semibold mb-1" style={{ color: "#1e293b" }}>
                Password
              </p>
              <p className="text-muted small mb-0">Last changed: Never</p>
            </div>
            <Button
              onClick={() => setShowPasswordModal(true)}
              style={{
                background: "#ffffff",
                color: "#1e40af",
                border: "2px solid #1e40af",
                borderRadius: "8px",
                padding: "0.6rem 1.25rem",
                fontWeight: 600,
              }}
            >
              <Lock size={16} className="me-2" />
              Change Password
            </Button>
          </div>
        </Card>
      </div>

      <div>
        <h6 className="fw-bold mb-3" style={{ color: "#1e293b" }}>
          Account Information
        </h6>
        <Card
          className="border-0"
          style={{
            background: "#f8fafc",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          <div className="row g-3">
            <div className="col-md-4">
              <p className="text-muted small mb-1">Account Status</p>
              <span
                className="badge"
                style={{
                  background:
                    profileData.userStatus === "ACTIVE" ? "#d1fae5" : "#fee2e2",
                  color:
                    profileData.userStatus === "ACTIVE" ? "#10B981" : "#EF4444",
                  padding: "0.5rem 1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {profileData.userStatus}
              </span>
            </div>
            <div className="col-md-4">
              <p className="text-muted small mb-1">Reward Points</p>
              <p
                className="fw-bold mb-0"
                style={{ color: "#1e40af", fontSize: "1.1rem" }}
              >
                ⭐ {profileData.rewardPoints}
              </p>
            </div>
            <div className="col-md-4">
              <p className="text-muted small mb-1">Languages</p>
              <p className="fw-semibold mb-0" style={{ color: "#1e293b" }}>
                {profileData.languages?.join(", ") || "Not set"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );


  return (
    <Container
      fluid
      style={{ background: "#f8fafc", minHeight: "100vh", padding: "2rem 0" }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          color: "#ffffff",
          padding: "2.5rem 0",
          marginBottom: "2rem",
        }}
      >
        <Container>
          <h1 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>
            My Profile
          </h1>
          <p style={{ opacity: 0.9, marginBottom: 0 }}>
            Manage your account and preferences
          </p>
        </Container>
      </div>

      <Container>
        <Card
          className="border-0 shadow-sm"
          style={{ borderRadius: "16px", overflow: "hidden" }}
        >
          <div className="d-flex" style={{ borderBottom: "2px solid #e2e8f0" }}>
            <button
              onClick={() => setActiveTab("personal")}
              style={{
                background:
                  activeTab === "personal" ? "#ffffff" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === "personal"
                    ? "3px solid #1e40af"
                    : "3px solid transparent",
                padding: "1rem 1.5rem",
                color: activeTab === "personal" ? "#1e40af" : "#64748b",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <User size={18} className="me-2" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("address")}
              style={{
                background: activeTab === "address" ? "#ffffff" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === "address"
                    ? "3px solid #1e40af"
                    : "3px solid transparent",
                padding: "1rem 1.5rem",
                color: activeTab === "address" ? "#1e40af" : "#64748b",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <MapPin size={18} className="me-2" />
              Addresses
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              style={{
                background:
                  activeTab === "settings" ? "#ffffff" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === "settings"
                    ? "3px solid #1e40af"
                    : "3px solid transparent",
                padding: "1rem 1.5rem",
                color: activeTab === "settings" ? "#1e40af" : "#64748b",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <Settings size={18} className="me-2" />
              Settings
            </button>
          </div>

          {activeTab === "personal" && renderPersonalInfo()}
          {activeTab === "address" && renderAddresses()}
          {activeTab === "settings" && renderSettings()}
        </Card>
      </Container>

      {/* Add Address Modal */}
      <Modal
        show={showAddAddressModal}
        onHide={() => setShowAddAddressModal(false)}
        centered
        size="lg"
        enforceFocus={false}
        autoFocus={false}
        restoreFocus={false}
      >
        <Modal.Header
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
            color: "#ffffff",
            border: "none",
          }}
        >
          <Modal.Title className="d-flex align-items-center gap-2">
            <MapPin size={24} />
            Add New Address
          </Modal.Title>
          <button
            onClick={() => setShowAddAddressModal(false)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              width: 32,
              height: 32,
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem" }}>
          <AddressFormFields
            formData={addressFormData}
            onChange={(field, value) =>
              setAddressFormData((prev) => ({ ...prev, [field]: value }))
            }
            errors={addressErrors}
            indianStates={indianStates}
          />
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: "2px solid #e2e8f0", padding: "1.5rem" }}
        >
          <Button
            onClick={() => setShowAddAddressModal(false)}
            style={{
              background: "#ffffff",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddAddress}
            style={{
              background: "#1e40af",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            <Plus size={18} className="me-2" />
            Add Address
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Address Modal */}
      <Modal
        show={showEditAddressModal}
        onHide={() => setShowEditAddressModal(false)}
        centered
        size="lg"
        enforceFocus={false}
        autoFocus={false}
        restoreFocus={false}
      >
        <Modal.Header
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
            color: "#ffffff",
            border: "none",
          }}
        >
          <Modal.Title className="d-flex align-items-center gap-2">
            <Edit2 size={24} />
            Edit Address
          </Modal.Title>
          <button
            onClick={() => setShowEditAddressModal(false)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              width: 32,
              height: 32,
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem" }}>
          <AddressFormFields
            formData={addressFormData}
            onChange={(field, value) =>
              setAddressFormData((prev) => ({ ...prev, [field]: value }))
            }
            errors={addressErrors}
            indianStates={indianStates}
          />
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: "2px solid #e2e8f0", padding: "1.5rem" }}
        >
          <Button
            onClick={() => setShowEditAddressModal(false)}
            style={{
              background: "#ffffff",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditAddress}
            style={{
              background: "#10B981",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            <Save size={18} className="me-2" />
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Address Modal */}
      <Modal
        show={showDeleteAddressModal}
        onHide={() => setShowDeleteAddressModal(false)}
        centered
      >
        <Modal.Header style={{ border: "none", paddingBottom: 0 }}>
          <button
            onClick={() => setShowDeleteAddressModal(false)}
            style={{
              background: "transparent",
              border: "none",
              marginLeft: "auto",
              cursor: "pointer",
            }}
          >
            <X size={24} color="#64748b" />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem", textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#fee2e2",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Trash2 size={32} color="#EF4444" />
          </div>
          <h5 className="fw-bold mb-2" style={{ color: "#1e293b" }}>
            Delete Address?
          </h5>
          <p className="text-muted">
            Are you sure you want to delete this address? This action cannot be
            undone.
          </p>
          {selectedAddress && (
            <div
              className="text-start p-3 mt-3"
              style={{
                background: "#f8fafc",
                borderRadius: "8px",
                border: "2px solid #e2e8f0",
              }}
            >
              <p className="mb-1 small text-muted">{selectedAddress.homeNo}</p>
              <p className="mb-1 small text-muted">{selectedAddress.town}</p>
              <p className="mb-0 small text-muted">
                {selectedAddress.city}, {selectedAddress.state} -{" "}
                {selectedAddress.pincode}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: "2px solid #e2e8f0", padding: "1.5rem" }}
        >
          <Button
            onClick={() => setShowDeleteAddressModal(false)}
            style={{
              background: "#ffffff",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAddress}
            style={{
              background: "#EF4444",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            <Trash2 size={18} className="me-2" />
            Delete Address
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
      >
        <Modal.Header
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
            color: "#ffffff",
            border: "none",
          }}
        >
          <Modal.Title className="d-flex align-items-center gap-2">
            <Lock size={24} />
            Change Password
          </Modal.Title>
          <button
            onClick={() => setShowPasswordModal(false)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              width: 32,
              height: 32,
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "2rem" }}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ color: "#1e293b" }}>
              New Password
            </Form.Label>
            <Form.Control
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              placeholder="Enter new password"
              style={{
                borderRadius: "8px",
                border: "2px solid #e2e8f0",
                padding: "0.75rem",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold" style={{ color: "#1e293b" }}>
              Confirm New Password
            </Form.Label>
            <Form.Control
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm new password"
              style={{
                borderRadius: "8px",
                border: "2px solid #e2e8f0",
                padding: "0.75rem",
              }}
            />
          </Form.Group>

          <div
            className="p-3"
            style={{
              background: "#f0f9ff",
              border: "2px solid #bfdbfe",
              borderRadius: "8px",
            }}
          >
            <p className="mb-0 small" style={{ color: "#1e40af" }}>
              <strong>Password Requirements:</strong> Minimum 6 characters
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{ borderTop: "2px solid #e2e8f0", padding: "1.5rem" }}
        >
          <Button
            onClick={() => setShowPasswordModal(false)}
            style={{
              background: "#ffffff",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordChange}
            style={{
              background: "#1e40af",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 1.5rem",
              fontWeight: 600,
            }}
          >
            <Lock size={18} className="me-2" />
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ConsumerProfile;
