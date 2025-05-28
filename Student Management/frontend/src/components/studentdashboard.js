import React, { useState, useEffect } from 'react';
import { getMyStudentData } from '../api/api.js';
import './studentdashboard.css'; // ✅ import the CSS file

const StudentDashBoard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStudentData = async () => {
            try {
                setLoading(true);
                const studentData = await getMyStudentData();
                setData(studentData);
            } catch (err) {
                setError('Failed to load student data. Please log in again.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadStudentData();
    }, []);

    if (loading) return <div className="student-dashboard">Loading...</div>;
    if (error) return <div className="student-dashboard">{error}</div>;
    if (!data) return <div className="student-dashboard">No student data found.</div>;

    return (
        <div className="student-dashboard">
            <h2>Student Details</h2>
            <ul>
                {Object.entries(data).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}</strong>
                        <span>{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashBoard;
