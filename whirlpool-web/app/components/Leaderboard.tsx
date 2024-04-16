import styles from "../styles/leaderboard.module.css";

interface User {
  nombre_empleado: string;
  points: number;
}

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const topUsers = sortedUsers.slice(0, 5);

  return (
    <div>
      {topUsers.map((user, index) => (
        <div key={index} className={styles.leader}>
          <div className={styles.nombre_empleado}>
            {index + 1}. {user.nombre_empleado}
          </div>
          <div className={styles.points}>
            {user.points} points
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;