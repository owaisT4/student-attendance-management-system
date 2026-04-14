import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import './TeacherViewStudents.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const TeacherViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [marking, setMarking] = useState(false);
  const [participationData, setParticipationData] = useState(null);
  const [fromDate, setFromDate] = useState(new Date().toISOString().substr(0, 10));
  const [toDate, setToDate] = useState(new Date().toISOString().substr(0, 10));

  //  refresh trigger for graph
  const [refreshChart, setRefreshChart] = useState(0);

  const navigate = useNavigate();
  const { class_id, class_name } = useParams();


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `http://localhost/student-attendance-managment-system/Backend/TeacherViewStudents.php?class_id=${class_id}`,
          { credentials: "include" }
        );
        const data = await res.json();

        setStudents(data.map(s => ({ ...s, status: "absent" })));
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, [class_id]);


  useEffect(() => {
    const fetchParticipation = async () => {
      try {
        const res = await fetch(
          `http://localhost/student-attendance-managment-system/Backend/Get_Participation_Data.php?class_id=${class_id}&from=${fromDate}&to=${toDate}`,
          { credentials: "include" }
        );

        const data = await res.json();

        setParticipationData({
          labels: data.map(d => d.student),
          datasets: [
            {
              label: "Participation Score",
              data: data.map(d => d.score),
              backgroundColor: "rgba(54, 162, 235, 0.6)"
            }
          ]
        });

      } catch (err) {
        console.error("Error fetching participation data:", err);
      }
    };

    fetchParticipation();

  }, [class_id, fromDate, toDate, refreshChart]); 

  const toggleAttendance = (index) => {
    const copy = [...students];
    copy[index].status =
      copy[index].status === "present" ? "absent" : "present";

    setStudents(copy);
  };

  const submitAttendance = async () => {
    try {
      const res = await fetch(
        "http://localhost/student-attendance-managment-system/Backend/Save_Attendance.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            class_id,
            date,
            attendance: students.map(s => ({
              student_id: s.ID,
              status: s.status,
              engagement: parseInt(s.engagement ?? 1)
            }))
          })
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("Attendance saved!");

        setMarking(false);

  
        setRefreshChart(prev => prev + 1);
      } else {
        alert("Failed: " + result.message);
      }

    } catch (err) {
      console.error("Error saving attendance:", err);
    }
  };

  const exportCSV = () => {
    window.open(
      `http://localhost/student-attendance-managment-system/Backend/Generate_Attendance_Report.php?class_id=${class_id}&from=${fromDate}&to=${toDate}`,
      "_blank"
    );
  };

  return (
    <div className="view-teacherviewstudents-container">

      <button className="back-button" onClick={() => navigate('/TeachersDashboard')}>
        Back
      </button>

      <h2>Students in {decodeURIComponent(class_name)}</h2>


      {marking && (
        <div className="attendance-controls">
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        </div>
      )}


      <table className="teacherviewstudents-table">
        <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>DOB</th>

    
    <th>Present?</th>
    <th>Engagement</th>
    <th>Status</th>
  </tr>
</thead>

        <tbody>
  {students.map((s, i) => (
    <tr key={s.ID}>
      <td>{s.ID}</td>
      <td>{s.Username}</td>
      <td>{s.DOB}</td>

      {/* Present */}
      <td>
        {marking ? (
          <input
            type="checkbox"
            checked={s.status === "present"}
            onChange={() => toggleAttendance(i)}
          />
        ) : (
          "-"
        )}
      </td>

      {/* Engagement */}
      <td>
        {marking ? (
          <select
  value={s.engagement || 1}
  onChange={(e) => {
    const copy = [...students];
    copy[i].engagement = parseInt(e.target.value);
    setStudents(copy);
  }}
>
  <option value="1">1 - Very Low</option>
  <option value="2">2 - Low</option>
  <option value="3">3 - Medium</option>
  <option value="4">4 - High</option>
  <option value="5">5 - Excellent</option>
</select>
        ) : (
          "-"
        )}
      </td>

      {/* Actions */}
      <td>
        {!marking ? (
          <button onClick={() => setMarking(true)}>
            Mark Attendance
          </button>
        ) : (
          <span>Marking...</span>
        )}
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {marking && (
        <button className="submit-btn" onClick={submitAttendance}>
          Submit Attendance
        </button>
      )}

      {/* PARTICIPATION GRAPH */}
      <div className="participation-section">
        <h3>Participation Scores</h3>

        <div className="date-filters">
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
            />
          </label>

          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
            />
          </label>
        </div>

        {participationData && (
          <Bar
            data={participationData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Participation Scores"
                }
              },
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        )}
      </div>

      <button className="submit-btn" onClick={exportCSV}>
        Export CSV Report
      </button>

    </div>
  );
};