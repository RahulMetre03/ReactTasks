import React, { useState } from 'react';
import { getStudentsData, getTeacherData } from '../api/api.js';

const PrincipalDashBoard = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState('');

    const loadStudents = async () => {
        const students = await getStudentsData();
        setData(students);
        setType('students');
    };

    const loadTeachers = async () => {
        const teachers = await getTeacherData();
        setData(teachers);
        setType('teachers');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Welcome Principal</h2>
            <button onClick={loadStudents} style={{ marginRight: '10px' }}>
                Load Students
            </button>
            <button onClick={loadTeachers}>
                Load Teachers
            </button>

            {data.length > 0 && (
                <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key.toUpperCase()}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                {Object.values(item).map((val, i) => (
                                    <td key={i}>{val}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PrincipalDashBoard;
