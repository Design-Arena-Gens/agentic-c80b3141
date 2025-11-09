import React, { useState, useEffect } from 'react';
import { CARSEngine } from '@/lib/carsEngine';
import { Context } from '@/lib/types';

interface Props {
  engine: CARSEngine;
  context: Context;
}

const RecommendationPanel: React.FC<Props> = ({ engine, context }) => {
  const [recommendations, setRecommendations] = useState<
    Array<{ itemId: string; score: number; explanation: string }>
  >([]);

  useEffect(() => {
    const candidateItems = ['movie1', 'movie2', 'movie3', 'movie4', 'movie5', 'movie6'];
    const recs = engine.recommend(context, candidateItems, 5);
    setRecommendations(recs);
  }, [engine, context]);

  const movieNames: Record<string, string> = {
    movie1: 'Action Hero',
    movie2: 'Thriller Night',
    movie3: 'Romance Forever',
    movie4: 'Family Adventures',
    movie5: 'Comedy Central',
    movie6: 'Drama Tales',
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-400';
    if (score >= 0.4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 0.7) return 'bg-green-500';
    if (score >= 0.4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="text-purple-200 text-sm mb-4">
        Recommendations based on habit patterns and compositional generalization
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center text-purple-300 py-8">
          No recommendations available for this context
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={rec.itemId}
              className="p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {movieNames[rec.itemId] || rec.itemId}
                    </h4>
                    <p className="text-xs text-purple-300">{rec.itemId}</p>
                  </div>
                </div>
                <div className={`text-right ${getScoreColor(rec.score)}`}>
                  <div className="text-2xl font-bold">
                    {(rec.score * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-purple-300">confidence</div>
                </div>
              </div>

              {/* Score bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${getScoreBarColor(
                    rec.score
                  )}`}
                  style={{ width: `${rec.score * 100}%` }}
                ></div>
              </div>

              <p className="text-sm text-purple-200 italic">{rec.explanation}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">
          💡 How It Works
        </h4>
        <p className="text-xs text-blue-200">
          The system uses habit modeling (H = C[B(R + PR)]) combined with
          compositional generalization to predict preferences. It analyzes
          repetition patterns, positive reinforcement (ratings), and transfers
          knowledge across similar contexts using symbolic rule extraction.
        </p>
      </div>
    </div>
  );
};

export default RecommendationPanel;
