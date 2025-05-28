import React, { useState, useEffect } from 'react';
import { getMyTeacherData } from '../api/api.js';

const TeacherDashBoard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTeacherData = async () => {
            try {
                setLoading(true);
                const teacherData = await getMyTeacherData();
                setData(teacherData);
            } catch (err) {
                setError('Failed to load teacher data. Please log in again.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTeacherData();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Loading your dashboard...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: 'red' }}>{error}</h2>
                <button 
                    onClick={() => window.location.reload()} 
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#2563eb', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h1 style={{ color: '#2563eb', marginBottom: '10px' }}>Teacher Dashboard</h1>
                <p style={{ color: '#666', fontSize: '16px' }}>Welcome back! Here's your profile information.</p>
            </div>
            
            {data && (
                <div style={{ 
                    backgroundColor: '#f8fafc', 
                    padding: '20px', 
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ marginBottom: '20px', color: '#374151' }}>Your Profile Information</h3>
                    
                    <table 
                        style={{ 
                            width: '100%',
                            borderCollapse: 'collapse',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: '#e5e7eb' }}>
                                <th style={{ 
                                    padding: '15px', 
                                    textAlign: 'left', 
                                    fontWeight: 'bold',
                                    color: '#374151',
                                    width: '30%'
                                }}>
                                    Field
                                </th>
                                <th style={{ 
                                    padding: '15px', 
                                    textAlign: 'left', 
                                    fontWeight: 'bold',
                                    color: '#374151'
                                }}>
                                    Information
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data).map(([key, value], index) => (
                                <tr 
                                    key={key}
                                    style={{ 
                                        backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
                                        borderBottom: '1px solid #e5e7eb'
                                    }}
                                >
                                    <td style={{ 
                                        padding: '12px 15px', 
                                        fontWeight: '600',
                                        textTransform: 'capitalize',
                                        color: '#4b5563'
                                    }}>
                                        {key.replace(/_/g, ' ')}
                                    </td>
                                    <td style={{ 
                                        padding: '12px 15px',
                                        color: '#1f2937'
                                    }}>
                                        {value || 'Not provided'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TeacherDashBoard;