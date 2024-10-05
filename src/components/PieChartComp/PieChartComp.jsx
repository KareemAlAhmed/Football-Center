
// import React from "react";

// // Function to calculate coordinates based on angle and radius
// const calculateCoordinates = (radius, angle) => {
//   const radians = (angle - 90) * (Math.PI / 180);
//   return {
//     x: radius * Math.cos(radians),
//     y: radius * Math.sin(radians),
//   };
// };

// // Function to generate a pie slice path with both outer and inner radius (like a donut chart)
// const calculateDonutPath = (startAngle, endAngle, outerRadius, innerRadius) => {
//   const outerStart = calculateCoordinates(outerRadius, startAngle);
//   const outerEnd = calculateCoordinates(outerRadius, endAngle);
//   const innerStart = calculateCoordinates(innerRadius, endAngle);
//   const innerEnd = calculateCoordinates(innerRadius, startAngle);

//   const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

//   return [
//     `M ${outerStart.x},${outerStart.y}`, // Move to the outer start point
//     `A ${outerRadius},${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x},${outerEnd.y}`, // Outer arc
//     `L ${innerStart.x},${innerStart.y}`, // Line to inner start point
//     `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x},${innerEnd.y}`, // Inner arc back to start
//     `Z`, // Close the path
//   ].join(" ");
// };

// const PieChart = ({ segments }) => {
//   let cumulativeAngle = 0; // Keeps track of where the last segment ended
//   const outerRadius = 60; // Outer radius for pie slices
//   const innerRadius = 44;  // Inner radius for the donut effect
//   const gapAngle = 5;      // Gap angle (in degrees)

//   return (
//     <svg className="pieChart" width="120" height="120" viewBox="0 0 120 120">
//       <g transform="translate(60, 60)">
//         {segments.map((segment, index) => {
//           const { percentage, color } = segment;

//           // Adjust the angles to account for the gap
//           const adjustedPercentage = percentage - (gapAngle / 360) * 100; // Adjust percentage to account for the gap
          
//           // Calculate the start and end angles for this segment with a gap
//           const startAngle = cumulativeAngle + gapAngle / 2; // Start angle with half gap
//           const endAngle = startAngle + (adjustedPercentage / 100) * 360; // Calculate the end angle
//           cumulativeAngle = endAngle + gapAngle / 2; // Move cumulative angle forward by endAngle + half the gap

//           // Path with both outer and inner radii for a donut shape
//           const path = calculateDonutPath(startAngle, endAngle, outerRadius, innerRadius);

//           return (
//             <path
//               key={index}
//               d={path}
//               fill={color}
//               role="presentation"
//               shapeRendering="auto"
//             />
//           );
//         })}
//       </g>
//     </svg>
//   );
// };

// export default PieChart;
import React from "react";

// Function to calculate coordinates based on angle and radius
const calculateCoordinates = (radius, angle) => {
  const radians = (angle - 90) * (Math.PI / 180); // Shift by 90 degrees to start from the top (12 o'clock)
  return {
    x: radius * Math.cos(radians),
    y: radius * Math.sin(radians),
  };
};

// Function to generate a pie slice path with both outer and inner radius (like a donut chart)
const calculateDonutPath = (startAngle, endAngle, outerRadius, innerRadius) => {
  const outerStart = calculateCoordinates(outerRadius, startAngle);
  const outerEnd = calculateCoordinates(outerRadius, endAngle);
  const innerStart = calculateCoordinates(innerRadius, endAngle);
  const innerEnd = calculateCoordinates(innerRadius, startAngle);

  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? 0 : 1;

  return [
    `M ${outerStart.x},${outerStart.y}`, // Move to the outer start point
    `A ${outerRadius},${outerRadius} 0 ${largeArcFlag} 0 ${outerEnd.x},${outerEnd.y}`, // Outer arc (counterclockwise)
    `L ${innerStart.x},${innerStart.y}`, // Line to inner start point
    `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 1 ${innerEnd.x},${innerEnd.y}`, // Inner arc back to start (clockwise)
    `Z`, // Close the path
  ].join(" ");
};

const PieChart = ({ segments }) => {
  let cumulativeAngle = 0; // Start at 12 o'clock (0 degrees)
  const outerRadius = 60; // Outer radius for pie slices
  const innerRadius = 44;  // Inner radius for the donut effect
  const gapAngle = 5;      // Uniform gap angle (in degrees)

  return (
    <svg className="pieChart" width="120" height="120" viewBox="0 0 120 120">
      <g transform="translate(60, 60)">
        {segments.map((segment, index) => {
          const { percentage, color } = segment;

          // Adjust the angles to account for the gap
          const adjustedPercentage = percentage - (gapAngle / 360) * 100; // Adjust percentage to account for the gap

          // Calculate the start and end angles for this segment with a gap
          const startAngle = cumulativeAngle - gapAngle / 2; // Start angle with half gap (counterclockwise)
          const endAngle = startAngle - (adjustedPercentage / 100) * 360; // Subtract for counterclockwise rotation
          cumulativeAngle = endAngle - gapAngle / 2; // Move cumulative angle backward by endAngle - half the gap

          // Path with both outer and inner radii for a donut shape
          const path = calculateDonutPath(startAngle, endAngle, outerRadius, innerRadius);

          return (
            <path
              key={index}
              d={path}
              fill={color}
              role="presentation"
              shapeRendering="auto"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PieChart;



