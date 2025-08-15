import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "reactstrap";
import { useParams } from "react-router-dom";
import { getCareGuideById } from "../api/api";

const CareGuideDetailsPage = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCareGuideById(id)
      .then((res) => {
        setGuide(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not fetch the guide.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Container className="text-center my-5"><Spinner color="primary" /></Container>;
  if (error) return <Container className="text-center my-5"><Alert color="danger">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <h2 className="text-primary">{guide.title}</h2>
      <p><strong>Pet Type:</strong> {guide.petType}</p>
      <div dangerouslySetInnerHTML={{ __html: guide.content }} />
    </Container>
  );
};

export default CareGuideDetailsPage;
