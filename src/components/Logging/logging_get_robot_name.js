export default function(id, reduxRobots) {
  const robots = reduxRobots.filter(robot => robot.id === id);
  return robots.length > 0 ? robots.pop().title : null;
};