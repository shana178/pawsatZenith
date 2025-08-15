import React, { useEffect, useState } from "react";
import { getCareGuides, createGuide, updateGuide } from "../api/api";
import { Button, Input, Form, FormGroup, Label } from "reactstrap";

const AdminCareGuides = () => {
  const [guides, setGuides] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", type: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    const { data } = await getCareGuides();
    setGuides(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateGuide(editingId, form);
    } else {
      await createGuide(form);
    }
    setForm({ title: "", content: "", type: "" });
    setEditingId(null);
    fetchGuides();
  };

  const handleEdit = (guide) => {
    setForm(guide);
    setEditingId(guide._id);
  };

  return (
    <div className="container my-4">
      <h2>Manage Care Guides</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Content</Label>
          <Input type="textarea" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label>Pet Type</Label>
          <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        </FormGroup>
        <Button type="submit" color="primary">{editingId ? "Update" : "Create"} Guide</Button>
      </Form>

      <hr />

      {guides.map((guide) => (
        <div key={guide._id} className="border p-3 my-2">
          <h5>{guide.title}</h5>
          <p>{guide.content}</p>
          <small>Type: {guide.type}</small>
          <br />
          <Button size="sm" onClick={() => handleEdit(guide)}>Edit</Button>
        </div>
      ))}
    </div>
  );
};

export default AdminCareGuides;
