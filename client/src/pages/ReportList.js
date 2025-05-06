import React, { useEffect, useState } from 'react';
import './ReportList.css';

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    fetch('http://localhost:5000/api/reports')
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du fetch des signalements :', err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('❗ Voulez-vous vraiment supprimer ce signalement ?')) return;
  
    try {
      console.log("Deleting report ID:", id); // <-- log d'identifiant
  
      const res = await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: 'DELETE',
      });
  
      const data = await res.json(); // <-- log de la réponse backend
      console.log('Réponse backend suppression :', data);
  
      if (res.ok) {
        setReports(prev => prev.filter(report => report.id !== id));
        alert('🗑️ Signalement supprimé.');
      } else {
        alert(data.message || 'Erreur lors de la suppression.');
      }
    } catch (error) {
      console.error('❌ Erreur suppression :', error);
      alert('Erreur serveur.');
    }
  };
  
  

  return (
    <div className="report-list-container">
      <h2>📋 Liste des signalements</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : reports.length === 0 ? (
        <p>Aucun signalement pour le moment.</p>
      ) : (
        <table className="report-table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Problème</th>
              <th>Commentaire</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.product_name}</td>
                <td>{report.issue_type}</td>
                <td>{report.comment}</td>
                <td>{report.user_email}</td>
                <td>{new Date(report.created_at).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(report.id)}>
                    🗑 Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportList;
