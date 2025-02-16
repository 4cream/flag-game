import type { Achievement } from "@/types/game"

interface AchievementsProps {
  achievements: Achievement[]
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <ul className="space-y-2">
        {achievements.map((achievement) => (
          <li
            key={achievement.id}
            className={`p-2 rounded ${achievement.unlocked ? "bg-green-100 dark:bg-green-800" : "bg-gray-100 dark:bg-gray-800"}`}
          >
            <h3 className="font-semibold">{achievement.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

