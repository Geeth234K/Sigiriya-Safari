import "./whatToDo.css";

export default function WhatToDo() {
  const activities = [
    { id: 1, title: "Jeep Safari", desc: "Thrilling wildlife safari through scenic trails" },
    { id: 2, title: "Hiking", desc: "Trek up Sigiriya Rock with stunning views" },
    { id: 3, title: "Village Tours", desc: "Explore authentic Sri Lankan village life" },
    { id: 4, title: "Bird Watching", desc: "Spot exotic birds in their natural habitat" },
    { id: 5, title: "Local Food", desc: "Taste authentic traditional cuisine" },
    { id: 6, title: "Photography", desc: "Capture breathtaking landscapes and wildlife" }
  ];

  return (
    <section className="activities">
      <div className="activities-container">
        <h1>What to Do</h1>
        <div className="activities-grid">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <h3>{activity.title}</h3>
              <p>{activity.desc}</p>
              <button>Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
