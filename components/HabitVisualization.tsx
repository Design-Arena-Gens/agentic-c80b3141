import React, { useState, useEffect } from 'react';
import { CARSEngine } from '@/lib/carsEngine';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  engine: CARSEngine;
}

const HabitVisualization: React.FC<Props> = ({ engine }) => {
  const [stats, setStats] = useState<{
    totalHabits: number;
    avgHabitStrength: number;
    topHabits: Array<{ itemId: string; strength: number }>;
  } | null>(null);

  useEffect(() => {
    const habitStats = engine.getHabitStatistics();
    setStats(habitStats);
  }, [engine]);

  if (!stats) {
    return <div className="text-purple-300">Loading habit statistics...</div>;
  }

  const movieNames: Record<string, string> = {
    movie1: 'Action Hero',
    movie2: 'Thriller Night',
    movie3: 'Romance Forever',
    movie4: 'Family Adventures',
    movie5: 'Comedy Central',
    movie6: 'Drama Tales',
  };

  const chartData = stats.topHabits.map((habit) => ({
    name: movieNames[habit.itemId] || habit.itemId,
    strength: Math.round(habit.strength * 100),
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
          <div className="text-purple-300 text-sm mb-1">Total Habits Formed</div>
          <div className="text-4xl font-bold text-white">{stats.totalHabits}</div>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
          <div className="text-blue-300 text-sm mb-1">Average Habit Strength</div>
          <div className="text-4xl font-bold text-white">
            {(stats.avgHabitStrength * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Top Habits Chart */}
      <div className="bg-white/5 p-6 rounded-lg border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          Top Habit Strengths by Item
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="name"
              stroke="#a78bfa"
              tick={{ fill: '#a78bfa', fontSize: 12 }}
            />
            <YAxis stroke="#a78bfa" tick={{ fill: '#a78bfa' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1b4b',
                border: '1px solid #7c3aed',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="strength" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Habits List */}
      <div className="bg-white/5 p-6 rounded-lg border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          Strongest Habit Patterns
        </h3>
        <div className="space-y-2">
          {stats.topHabits.slice(0, 5).map((habit, index) => (
            <div
              key={habit.itemId}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                <span className="text-white font-medium">
                  {movieNames[habit.itemId] || habit.itemId}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${habit.strength * 100}%` }}
                  ></div>
                </div>
                <span className="text-purple-300 text-sm font-semibold w-12 text-right">
                  {(habit.strength * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
        <h4 className="text-sm font-semibold text-amber-300 mb-2">
          📊 Habit Strength Calculation
        </h4>
        <p className="text-xs text-amber-200">
          Habit strength is computed as: H = α × log(R+1)/log(100) + β × PR, where
          R is repetition count, PR is positive reinforcement (normalized rating),
          and α=β=0.5. Higher values indicate stronger behavioral patterns in specific
          contexts.
        </p>
      </div>
    </div>
  );
};

export default HabitVisualization;
