import { useState, useEffect } from "react";
import { staffAPI } from "../services/api";
import StaffCard from "../components/staff/StaffCard";
import "./About.scss";

const About = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await staffAPI.getAll();
        setStaff(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="about">
      <div className="about__container">
        <section className="about__intro">
          <h1 className="about__title">About Bob's Garage</h1>
          <p className="about__text">
            Our team of experienced mechanics is dedicated to keeping your
            vehicle running smoothly and safely. Whether you need routine
            maintenance or major repairs, we're here to help.
          </p>
        </section>

        <section className="about__staff">
          <h2 className="about__section-title">Meet Our Team</h2>
          {loading && <div className="about__loading">Loading staff...</div>}
          {error && <div className="about__error">Error: {error}</div>}
          {!loading && !error && (
            <div className="about__staff-grid">
              {staff.length > 0 ? (
                staff.map((member) => (
                  <StaffCard key={member.id} staff={member} />
                ))
              ) : (
                <p>No staff members available.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default About;
