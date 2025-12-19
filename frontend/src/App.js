import React, { useEffect, useState } from "react";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [lastCleanedDate, setLastCleanedDate] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  
  // GET ALL EQUIPMENT
  
  const fetchEquipment = async () => {
    try {
      const response = await fetch("/api/equipment");
      if (!response.ok) throw new Error("Failed to fetch equipment");
      const data = await response.json();
      setEquipment(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  
  // ADD or UPDATE
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !type || !status || !lastCleanedDate) {
      setValidationMsg("All fields are required");
      return;
    }

    try {
      if (id) {
        // UPDATE
        const res = await fetch(`/api/equipment/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, type, status, lastCleanedDate }),
        });

        if (!res.ok) throw new Error("Update failed");
      } else {
        // ADD
        const res = await fetch("/api/equipment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, type, status, lastCleanedDate }),
        });

        if (!res.ok) throw new Error("Add failed");
      }

      resetForm();
      fetchEquipment();
      setValidationMsg("");  // Clear validation message on successful form submission
    } catch (err) {
      alert(err.message);
    }
  };


  // EDIT
  
  const editEquipment = (item) => {
    setId(item.id);
    setName(item.name);
    setType(item.type);
    setStatus(item.status);
    setLastCleanedDate(item.lastCleanedDate);
  };

  
  // DELETE

  const deleteEquipment = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;

    try {
      const res = await fetch(`/api/equipment/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setEquipment(equipment.filter((e) => e.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setId(null);
    setName("");
    setType("");
    setStatus("");
    setLastCleanedDate("");
    setValidationMsg("");  // Clear validation message on reset
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{id ? "Edit Equipment" : "Add Equipment"}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          value={lastCleanedDate}
          onChange={(e) => setLastCleanedDate(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>{id ? "Update" : "Add"}</button>
        {id && <button onClick={resetForm} style={styles.cancelButton}>Cancel</button>}
      </form>
      
      {/* Show validation message if there is one */}
      {validationMsg && (
        <div style={styles.validationMsg}>
          {validationMsg}
        </div>
      )}

      <h2 style={styles.header}>Equipment List</h2>

      <table style={styles.table} border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>{item.lastCleanedDate}</td>
              <td>
                <button onClick={() => editEquipment(item)} style={styles.editButton}>Edit</button>
                <button onClick={() => deleteEquipment(item.id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Basic inline styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px",
    backgroundColor: "#f44336",
    color: "white",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  validationMsg: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#f44336",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default App;