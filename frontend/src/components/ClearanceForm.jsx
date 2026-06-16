import React from "react";

function ClearanceForm({
  visitorName,
  setVisitorName,
  collegeName,
  setCollegeName,
  schoolName,
  setSchoolName,
  purpose,
  setPurpose,
  facultyName,
  setFacultyName,
  facultyId,
  setFacultyId,
  studentEmail,
  setStudentEmail,
  handleSubmit,
  submitLoading,
}) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0",
        color: "#0f172a",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px 0",
          fontSize: "18px",
          fontWeight: "700",
          color: "#0f172a",
          borderBottom: "2px solid #f1f5f9",
          paddingBottom: "10px",
        }}
      >
        🎫 Gatepass Clearance Form
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Student / Visitor Name */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Student / Visitor Name
          </label>
          <input
            type="text"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            required
            placeholder="Enter full name"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* University Base */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            University Base
          </label>
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#f8fafc",
              color: "#475569",
              boxSizing: "border-box",
              fontWeight: "500",
            }}
            readOnly
          />
        </div>

        {/* Department / School */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Department / School
          </label>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
            placeholder="e.g. SODAI, SOET"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Purpose of Visit - 6 Standard Options Dropdown */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Purpose of Visit
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
          >
            <option value="" disabled>
              Select Purpose of Visit
            </option>
            <option value="Hostel Leave Form Verified Entry">
              Hostel Leave Form Verified Entry
            </option>
            <option value="Official Outpass Approved by HOD">
              Official Outpass Approved by HOD
            </option>
            <option value="Personal / Medical Emergency">
              Personal / Medical Emergency
            </option>
            <option value="University Official Duty / Event">
              University Official Duty / Event
            </option>
            <option value="Exam / Placement Drive Clearance">
              Exam / Placement Drive Clearance
            </option>
            <option value="Day Scholar Daily Exit Permission">
              Day Scholar Daily Exit Permission
            </option>
          </select>
        </div>

        {/* Approving Faculty Name */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Approving Faculty Name
          </label>
          <input
            type="text"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            required
            placeholder="Faculty Name"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Faculty Employee ID */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Faculty Employee ID
          </label>
          <input
            type="text"
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            required
            placeholder="Enter Faculty ID"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Student Email ID */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: "700",
              color: "#475569",
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Student Email ID
          </label>
          <input
            type="email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
            placeholder="student@gmail.com"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              color: "#0f172a",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#1e293b",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "750",
            cursor: "pointer",
            opacity: submitLoading ? 0.7 : 1,
          }}
        >
          {submitLoading
            ? "Generating Gatepass..."
            : "Issue Official Outpass →"}
        </button>
      </form>
    </div>
  );
}

export default ClearanceForm;
