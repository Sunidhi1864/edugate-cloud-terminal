import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function PassTable({
  filteredPasses,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  handlePass,
  handleReject,
  handleDelete,
  handlePrintPass,
}) {
  const handleExport = () => {
    const data = filteredPasses.map((item) => ({
      Name: item.name,
      Department: item.schoolName,
      Purpose: item.purpose,
      Faculty: item.facultyName,
      Faculty_ID: item.facultyId,
      Status: item.status || "AWAITING",
      Date: item.dateIn,
      Time: item.timeIn,
      Email: item.studentEmail,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Gate Pass Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "CTU_GatePass_Report.xlsx");
  };

  // Aapka map function ab filteredPasses.map() hona chahiye

  /*{
  // Search aur Status Filter logic
  const filteredEntries = entries.filter((item) => {
    const matchesSearch =
      item.visitorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.token?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  }); */

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Search and Filters Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{ display: "flex", gap: "10px", flex: 1, minWidth: "280px" }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              placeholder="🔍 Search Name, Token or Department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="All">All Exit Protocols</option>
            <option value="AWAITING">Awaiting</option>
            <option value="CLEARED">Cleared</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <button
          onClick={handleExport}
          style={{
            backgroundColor: "#1e293b",
            color: "#ffffff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          📊 Export Report
        </button>
      </div>

      {/* Table Content */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f8fafc",
                borderBottom: "2px solid #e2e8f0",
              }}
            >
              <th
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                  fontWeight: "700",
                }}
              >
                TOKEN
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                  fontWeight: "700",
                }}
              >
                PERSON
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                  fontWeight: "700",
                }}
              >
                EXIT DETAILS
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                  fontWeight: "700",
                }}
              >
                AUTHORIZER
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                  fontWeight: "700",
                }}
              >
                STATUS
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  color: "#475569",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPasses.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  No exit logs found.
                </td>
              </tr>
            ) : (
              filteredPasses.map((item) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #f1f5f9",
                    transition: "background-color 0.2s",
                  }}
                >
                  {/* Token */}
                  <td
                    style={{
                      padding: "14px 16px",
                      fontFamily: "monospace",
                      fontWeight: "600",
                      color: "#2563eb",
                    }}
                  >
                    {item.id ? item.id.substring(0, 7).toUpperCase() : "N/A"}
                  </td>

                  {/* Person Info */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: "700", color: "#0f172a" }}>
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        fontWeight: "500",
                        marginTop: "2px",
                      }}
                    >
                      {item.schoolName}
                    </div>
                  </td>

                  {/* Exit Details */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: "600", color: "#334155" }}>
                      {item.purpose}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginTop: "2px",
                      }}
                    >
                      {item.dateIn} | {item.timeIn}
                    </div>
                  </td>

                  {/* Authorizer */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: "600", color: "#334155" }}>
                      {item.facultyName}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        marginTop: "2px",
                      }}
                    >
                      ID: {item.facultyId}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: "14px 16px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        backgroundColor:
                          item.status === "CLEARED"
                            ? "#dcfce7"
                            : item.status === "REJECTED"
                              ? "#fee2e2"
                              : "#fef9c3",
                        color:
                          item.status === "CLEARED"
                            ? "#15803d"
                            : item.status === "REJECTED"
                              ? "#b91c1c"
                              : "#a16207",
                      }}
                    >
                      {item.status || "AWAITING"}
                    </span>
                  </td>

                  {/* Actions Column (Conditional rendering applied) */}
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                      }}
                    >
                      {/* Agar status AWAITING hai, sirf tabhi Pass aur Reject buttons dikhenge */}
                      {(!item.status || item.status === "AWAITING") && (
                        <>
                          <button
                            onClick={() => handlePass(item)}
                            style={{
                              backgroundColor: "#2563eb",
                              color: "#ffffff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontWeight: "700",
                              cursor: "pointer",
                              fontSize: "11px",
                            }}
                          >
                            Pass
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            style={{
                              backgroundColor: "#dc2626",
                              color: "#ffffff",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontWeight: "700",
                              cursor: "pointer",
                              fontSize: "11px",
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {/* Delete button hamesha rahega taaki clean up ho sake */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: "#64748b",
                          color: "#ffffff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: "11px",
                        }}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handlePrintPass(item)}
                        style={{
                          backgroundColor: "#0f766e",
                          color: "#ffffff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: "11px",
                        }}
                      >
                        🖨 Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default PassTable;
