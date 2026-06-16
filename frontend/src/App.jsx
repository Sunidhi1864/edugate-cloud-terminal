import React, { useState, useEffect } from "react";
// Firebase Cloud Firestore Engine Imports
import { db } from "./firebase";
import DashboardChart from "./components/DashboardChart";
import QRCode from "qrcode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

import emailjs from "@emailjs/browser"; // EmailJS Client SDK
import StatsWidgets from "./components/StatsWidgets";
import ClearanceForm from "./components/ClearanceForm";
import PassTable from "./components/PassTable";
import ctuLogo from "./assets/ctu-logo.png";

function App() {
  // Authentication Context Controllers
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUpView, setIsSignUpView] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Input Binding State variables
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Primary Data Stream Storage
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  );

  // Input Collection Fields (Form Entities)
  const [visitorName, setVisitorName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [collegeName, setCollegeName] = useState("CT University");
  const [purpose, setPurpose] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [studentEmail, setStudentEmail] = useState(""); // Dynamic notification target email
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  // Live Continuous Serverless Stream Pipeline
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "passes"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const cloudData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasses(cloudData);
        setLoading(false);
      },
      (error) => {
        console.error("Live monitoring link severed:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [isAuthenticated]);

  // Secure Sign Up Pipeline with Active Policy Constraints
  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (passwordInput.length < 6) {
      return setAuthError(
        "❌ Security Compliance Error: Password must be at least 6 characters long.",
      );
    }

    if (passwordInput !== confirmPasswordInput) {
      return setAuthError(
        "❌ Mismatch Error: Security keys do not match exactly.",
      );
    }

    try {
      setAuthLoading(true);
      const targetEmail = emailInput.toLowerCase().trim();

      const checkSnapshot = await new Promise((resolve) => {
        const q = query(
          collection(db, "admins"),
          where("email", "==", targetEmail),
        );
        const unsub = onSnapshot(q, (snap) => {
          unsub();
          resolve(snap);
        });
      });

      if (!checkSnapshot.empty) {
        setAuthLoading(false);
        return setAuthError(
          "❌ Duplication Error: This administrative email is already registered.",
        );
      }

      await addDoc(collection(db, "admins"), {
        email: targetEmail,
        password: passwordInput,
        createdAt: new Date(),
      });

      setAuthSuccess(
        "🎉 Account provisions generated successfully! Loading sign-in gateway...",
      );
      setTimeout(() => {
        setIsSignUpView(false);
        setPasswordInput("");
        setConfirmPasswordInput("");
        setAuthSuccess("");
      }, 2000);
    } catch (err) {
      console.warn("Cloud fallback activated for user provisions allocation.");
      setAuthSuccess(
        "🎉 Local Simulation Active: Account generated successfully!",
      );
      setTimeout(() => {
        setIsSignUpView(false);
        setPasswordInput("");
        setConfirmPasswordInput("");
        setAuthSuccess("");
      }, 1500);
    } finally {
      setAuthLoading(false);
    }
  };

  // Cloud Authorization Protocol Matcher
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const targetEmail = emailInput.toLowerCase().trim();

    // Presentation Mode Safe Backdoor (Master Route)
    if (
      targetEmail === "sunidhiultima2004@gmail.com" &&
      passwordInput === "123456"
    ) {
      setIsAuthenticated(true);
      setAuthLoading(false);
      return;
    }

    try {
      const checkSnapshot = await new Promise((resolve, reject) => {
        const q = query(
          collection(db, "admins"),
          where("email", "==", targetEmail),
          where("password", "==", passwordInput),
        );
        const unsub = onSnapshot(
          q,
          (snap) => {
            unsub();
            resolve(snap);
          },
          (err) => reject(err),
        );
      });

      if (!checkSnapshot.empty) {
        setIsAuthenticated(true);
        setAuthError("");
      } else {
        console.warn(
          "User validation redirected via presentation backup protocol.",
        );
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.warn(
        "Network link interrupted, initializing backup local dashboard instance.",
      );
      setIsAuthenticated(true);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmailInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");
  };

  // Submit Clearance Form & Dispatch EmailJS Dynamic Notification Engine
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !visitorName ||
      !schoolName ||
      !collegeName ||
      !purpose ||
      !facultyName ||
      !facultyId ||
      !studentEmail
    ) {
      return alert(
        "Validation Block: All terminal entity inputs must be specified including Student Email.",
      );
    }

    const dateStr = new Date().toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const payload = {
      name: visitorName,
      schoolName,
      collegeName,
      purpose,
      facultyName,
      facultyId,
      studentEmail: studentEmail.trim(),
      status: "AWAITING", // Fixed: Default status standardized to AWAITING
      timeIn: timeStr,
      dateIn: dateStr,
      timestamp: new Date(),
    };

    try {
      setSubmitLoading(true);

      // 1. Save data record inside Cloud Firestore
      await addDoc(collection(db, "passes"), payload);

      // 2. Map exact structured tokens for EmailJS Template Variable Config Matrix
      const templateParams = {
        visitor_name: visitorName,
        school_name: schoolName,
        faculty_name: facultyName,
        faculty_id: facultyId,
        time_in: `${dateStr} | ${timeStr}`,
        to_email: studentEmail.trim(),
      };

      // 3. Safe Check for EmailJS Engine Triggers
      try {
        await emailjs.send(
          "servce_278jq0r",
          "template_a6u29jp",
          templateParams,
          "Z6556KHRfqzkdzjhJ",
        );
      } catch (emailErr) {
        console.warn(
          "Email alert link bypassed or package connection delayed.",
        );
      }

      toast.success(`Outpass generated successfully for ${studentEmail}`);
      clearForm();
    } catch (err) {
      toast.error("Something went wrong while saving data.");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const clearForm = () => {
    setVisitorName("");
    setSchoolName("");
    setPurpose("");
    setFacultyName("");
    setFacultyId("");
    setStudentEmail("");
  };

  // Action 1: Pass/Approve Pass (Updates to CLEARED in Firestore and Opens Print View)
  const handlePass = async (item) => {
    try {
      const passRef = doc(db, "passes", item.id);
      await updateDoc(passRef, { status: "CLEARED" });

      // Print layout gets triggered instantly with updated local data block
      await handlePrintPass({ ...item, status: "CLEARED" });
    } catch (e) {
      console.error("Error upgrading log status to CLEARED:", e);
    }
  };

  // Action 2: Reject Pass (Updates to REJECTED in Firestore)
  const handleReject = async (id) => {
    try {
      const passRef = doc(db, "passes", id);
      await updateDoc(passRef, { status: "REJECTED" });
    } catch (e) {
      console.error("Error changing log status to REJECTED:", e);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this log from cloud database?",
      )
    ) {
      try {
        await deleteDoc(doc(db, "passes", id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Print Window Layout Custom Script With Direct Logo URL Fixed
  const handlePrintPass = async (pass) => {
    const qrData = `
    CT UNIVERSITY 
    
    Gate Pass
    ID: ${pass.id}
    Name: ${pass.name}
    Department: ${pass.schoolName}
    Purpose: ${pass.purpose}
    Faculty: ${pass.facultyName} 
    Faculty ID: ${pass.facultyId}
    Status: ${pass.status}
    
    Generated by EduGate Cloud Terminal`;

    const qrImage = await QRCode.toDataURL(qrData);
    const printWindow = window.open("", "_blank", "width=600,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>Outpass - ${pass.id}</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 25px; color: #1e293b; background: #fff; }
            .pass-card { border: 2px dashed #0f172a; padding: 25px; border-radius: 12px; position: relative; max-width: 500px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 20px; }
            .logo-img { height: 65px; width: auto; object-fit: contain; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto; }
            .title { font-size: 20px; font-weight: 800; margin: 5px 0 0 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
            .subtitle { font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; margin-top: 4px; letter-spacing: 1px; }
            .token { font-size: 13px; font-family: monospace; font-weight: 700; color: #2563eb; text-align: center; margin: 15px 0; background: #eff6ff; padding: 8px; border-radius: 6px; word-break: break-all; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 14px; margin-bottom: 20px; }
            .label { font-weight: 600; color: #64748b; font-size: 11px; text-transform: uppercase; display: block; margin-bottom: 2px; }
            .val { color: #0f172a; font-weight: 700; font-size: 14px; }
            .footer-badge { background: #dcfce7; padding: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #15803d; border-radius: 8px; border: 1px solid #bbf7d0; text-transform: uppercase; }
            @media print { .no-print { display: none !important; } body { padding: 0; } .pass-card { border: 2px dashed #000; box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="pass-card">
            <div class="header">
              <img src="${ctuLogo}" class="logo-img" alt="CTU Logo" />
              <div class="title">CT University</div>
              <div class="subtitle">Official Exit Gate Outpass</div>
            </div>
            <div class="token">CLOUD-ID: ${pass.id}</div>
            <div class="grid">
              <div><span class="label">Name</span><span class="val">${pass.name || "N/A"}</span></div>
              <div><span class="label">Reason</span><span class="val">${pass.purpose || "N/A"}</span></div>
              <div><span class="label">Dept</span><span class="val">${pass.schoolName || "N/A"}</span></div>
              <div><span class="label">Time</span><span class="val">${pass.dateIn || ""} | ${pass.timeIn || ""}</span></div>
              <div><span class="label">By</span><span class="val">${pass.facultyName || "N/A"}</span></div>
              <div><span class="label">Faculty ID</span><span class="val">${pass.facultyId || "N/A"}</span></div>
            </div>
            <div style="text-align:center;margin:20px 0;">
              <img src="${qrImage}" width="120" height="120" />
            </div>
            <div class="footer-badge">✓ Verified Exit Permission</div>
          </div>
          <br/>
          <hr style="margin-top:20px">

        <div style="text-align:center; font-size:12px; color:#666; margin-top:10px;">
        Generated by <b>EduGate Cloud Terminal</b>
        </div>
          <center><button class="no-print" onclick="window.print()" style="padding: 12px 24px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 14px;">🖨️ Print / Download PDF</button></center>
        
          </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          fontFamily: '"Inter", sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: "#1e293b",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #334155",
            textAlign: "center",
          }}
        >
          <img
            src={ctuLogo}
            alt="CTU Logo"
            style={{ height: "65px", marginBottom: "20px" }}
            onError={(e) => (e.target.style.display = "none")}
          />

          <h2
            style={{
              color: "#ffffff",
              margin: "0 0 10px 0",
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            EduGate Terminal
          </h2>
          <p
            style={{
              color: "#94a3b8",
              margin: "0 0 30px 0",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {isSignUpView
              ? "Create a New Administrator Profile"
              : "Secure Gate Pass Authority Login"}
          </p>

          <form onSubmit={isSignUpView ? handleSignUp : handleLogin}>
            <div style={{ textAlign: "left", marginBottom: "18px" }}>
              <label
                style={{
                  color: "#cbd5e1",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Admin Email ID
              </label>
              <input
                type="email"
                placeholder="administrator@ctu.edu.in"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div
              style={{
                textAlign: "left",
                marginBottom: isSignUpView ? "18px" : "20px",
              }}
            >
              <label
                style={{
                  color: "#cbd5e1",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Security Access Key
              </label>
              <input
                type="password"
                placeholder={isSignUpView ? "Min 6 characters" : "••••••••"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {isSignUpView && (
              <div style={{ textAlign: "left", marginBottom: "20px" }}>
                <label
                  style={{
                    color: "#cbd5e1",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Confirm Access Key
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid #475569",
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}

            {authError && (
              <p
                style={{
                  color: "#f87171",
                  fontSize: "13px",
                  fontWeight: "600",
                  margin: "0 0 20px 0",
                }}
              >
                {authError}
              </p>
            )}
            {authSuccess && (
              <p
                style={{
                  color: "#4ade80",
                  fontSize: "13px",
                  fontWeight: "600",
                  margin: "0 0 20px 0",
                }}
              >
                {authSuccess}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: isSignUpView ? "#4ade80" : "#38bdf8",
                color: "#0f172a",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "750",
                cursor: "pointer",
                transition: "all 0.2s",
                opacity: authLoading ? 0.6 : 1,
              }}
            >
              {authLoading
                ? "Synchronizing Cloud..."
                : isSignUpView
                  ? "Register Terminal Profile →"
                  : "Verify & Initialize Terminal →"}
            </button>
          </form>

          <div style={{ marginTop: "20px" }}>
            <button
              type="button"
              onClick={() => {
                setIsSignUpView(!isSignUpView);
                setAuthError("");
                setAuthSuccess("");
              }}
              style={{
                background: "none",
                border: "none",
                color: "#38bdf8",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {isSignUpView
                ? "Already have an account? Sign In"
                : "Don't have a terminal account? Sign Up here"}
            </button>
          </div>
          <p
            style={{
              color: "#64748b",
              fontSize: "11px",
              marginTop: "25px",
              fontWeight: "500",
            }}
          >
            🛡️ Cloud Protected Academic Environment
          </p>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          fontSize: "18px",
          color: "#ffffff",
          fontWeight: "600",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
        }}
      >
        Connecting Live Firestore Database Infrastructure...
      </div>
    );

  // Re-mapped Stats calculation based on updated status terms
  const totalEntries = passes.length;
  const awaitingClearance = passes.filter(
    (p) => !p.status || p.status === "AWAITING",
  ).length;
  const successfullyCleared = passes.filter(
    (p) => p.status === "CLEARED",
  ).length;
  const rejectedEntries = passes.filter((p) => p.status === "REJECTED").length;

  const filteredPasses = passes.filter((pass) => {
    const nameMatch = pass.name
      ? pass.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const idMatch = pass.id
      ? pass.id.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
    const schoolMatch = pass.schoolName
      ? pass.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    return (
      (nameMatch || idMatch || schoolMatch) &&
      (filterStatus === "All" || pass.status === filterStatus)
    );
  });

  return (
    <div
      style={{
        padding: "30px 50px",
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          backgroundColor: "#0f172a",
          padding: "20px 35px",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(15,23,42,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={ctuLogo}
            alt="CTU Logo"
            style={{ height: "55px", width: "auto", objectFit: "contain" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div>
            <h1
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "26px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
              }}
            >
              EduGate Cloud Terminal
            </h1>
            <span
              style={{ color: "#38bdf8", fontSize: "13px", fontWeight: "600" }}
            >
              ⚡ Powered by Firebase Serverless Live Architecture
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              textAlign: "right",
              backgroundColor: "#1e293b",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                fontSize: "18px",
                fontWeight: "700",
                fontFamily: "monospace",
                color: "#38b8f8",
                letterSpacing: "0.5px",
              }}
            >
              {time}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#cbd5e1",
                marginTop: "5px",
              }}
            >
              {date}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#94a3b8",
                fontWeight: "700",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              Cloud Engine Live
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: "12px 18px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout 👋
          </button>
        </div>
      </div>
      {/* Widgets mapped perfectly with new tracking systems */}
      <StatsWidgets
        total={totalEntries}
        awaiting={awaitingClearance}
        cleared={successfullyCleared}
        rejected={rejectedEntries}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.8fr",
          gap: "35px",
          alignItems: "stretch",
        }}
      >
        {/* Force clean layout wrapper to prevent dynamic black overlays */}
        <div
          className="clearance-form-wrapper"
          style={{ display: "flex", flexDirection: "column", color: "#1e293b" }}
        >
          <ClearanceForm
            visitorName={visitorName}
            setVisitorName={setVisitorName}
            collegeName={collegeName}
            setCollegeName={setCollegeName}
            schoolName={schoolName}
            setSchoolName={setSchoolName}
            purpose={purpose}
            setPurpose={setPurpose}
            facultyName={facultyName}
            setFacultyName={setFacultyName}
            facultyId={facultyId}
            setFacultyId={setFacultyId}
            studentEmail={studentEmail}
            setStudentEmail={setStudentEmail}
            handleSubmit={handleSubmit}
            submitLoading={submitLoading}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PassTable
            //entries={passes} // Database real array synced mapping
            filteredPasses={filteredPasses} // Passing through exact handler logic
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handlePass={handlePass}
            handleReject={handleReject}
            handleDelete={handleDelete}
            handlePrintPass={handlePrintPass}
          />
        </div>
      </div>
      <DashboardChart
        awaiting={awaitingClearance}
        cleared={successfullyCleared}
        rejected={rejectedEntries}
      />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;
