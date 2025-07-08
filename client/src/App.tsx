import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    skills: "",
    tone: "Professional",
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("http://localhost:5050/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setOutput(data.result || "Error: No output received.");
    } catch (err) {
      console.error(err);
      setOutput("Error contacting backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🧠 PersonaForge AI</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Profession: </label>
          <input type="text" name="profession" value={formData.profession} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Skills: </label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Tone: </label>
          <select name="tone" value={formData.tone} onChange={handleChange}>
            <option>Professional</option>
            <option>Friendly</option>
            <option>Casual</option>
            <option>Chill and smart</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Bio"}
        </button>
      </form>

      {output && (
        <div style={{ whiteSpace: "pre-wrap", border: "1px solid #ccc", padding: "1rem" }}>
          <strong>Generated Bio:</strong>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

export default App;
