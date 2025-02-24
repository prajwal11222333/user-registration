import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
  ScatterChart,
  Scatter,
} from "recharts";
import "./App.css"; // Import CSS for styling

const data = [
  { name: "Jan", value: 40 },
  { name: "Feb", value: 60 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 100 },
  { name: "May", value: 90 },
];

const charts = {
  line: (
    <LineChart width={350} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#0ff" />
      <YAxis stroke="#0ff" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" stroke="#ff00ff" strokeWidth={2} />
    </LineChart>
  ),
  bar: (
    <BarChart width={350} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#0ff" />
      <YAxis stroke="#0ff" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#ff00ff" />
    </BarChart>
  ),
  area: (
    <AreaChart width={350} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#0ff" />
      <YAxis stroke="#0ff" />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="value" stroke="#ff00ff" fill="#800080" />
    </AreaChart>
  ),
  composed: (
    <ComposedChart width={350} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="#0ff" />
      <YAxis stroke="#0ff" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#ff00ff" />
      <Line type="monotone" dataKey="value" stroke="#0ff" strokeWidth={2} />
    </ComposedChart>
  ),
  scatter: (
    <ScatterChart width={350} height={200}>
      <CartesianGrid stroke="#444" />
      <XAxis type="category" dataKey="name" stroke="#0ff" />
      <YAxis type="number" stroke="#0ff" />
      <Tooltip />
      <Legend />
      <Scatter name="Values" data={data} fill="#ff00ff" />
    </ScatterChart>
  ),
};

const Dashboard = () => {
  const [selectedCharts, setSelectedCharts] = useState({});

  const toggleChart = (chart) => {
    setSelectedCharts((prevState) => ({
      ...prevState,
      [chart]: !prevState[chart], // Toggle visibility
    }));
  };

  return (
    <div className="dashboard">
      <h2 className="title">Neon Dashboard with Charts</h2>
      <div className="card-container">
        {Object.keys(charts).map((chart) => (
          <div key={chart} className="chart-card">
            <h4>{chart.toUpperCase()} Chart</h4>
            <button onClick={() => toggleChart(chart)}>Click me to see the graph</button>
            {selectedCharts[chart] && <div className="chart-container">{charts[chart]}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
