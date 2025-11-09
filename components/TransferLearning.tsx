import React, { useState } from 'react';
import { CARSEngine } from '@/lib/carsEngine';
import { Context } from '@/lib/types';

interface Props {
  engine: CARSEngine;
  contexts: Context[];
}

const TransferLearning: React.FC<Props> = ({ engine, contexts }) => {
  const [sourceContext, setSourceContext] = useState<Context>(contexts[0]);
  const [targetContext, setTargetContext] = useState<Context>(contexts[1]);
  const [transfers, setTransfers] = useState<
    Array<{ itemId: string; transferScore: number }>
  >([]);

  const handleTransfer = () => {
    const result = engine.transferHabits(sourceContext, targetContext);
    setTransfers(result.slice(0, 5));
  };

  const movieNames: Record<string, string> = {
    movie1: 'Action Hero',
    movie2: 'Thriller Night',
    movie3: 'Romance Forever',
    movie4: 'Family Adventures',
    movie5: 'Comedy Central',
    movie6: 'Drama Tales',
  };

  return (
    <div className="space-y-6">
      <div className="text-purple-200 text-sm mb-4">
        Demonstrate how habits transfer from one context to another using compositional
        generalization. Select source and target contexts to see which behavioral
        patterns can be transferred.
      </div>

      {/* Context Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-purple-300 mb-2">
            Source Context
          </h4>
          <select
            value={sourceContext.id}
            onChange={(e) =>
              setSourceContext(contexts.find((c) => c.id === e.target.value)!)
            }
            className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white"
          >
            {contexts.map((ctx) => (
              <option key={ctx.id} value={ctx.id}>
                {ctx.name.replace(/_/g, ' ').toUpperCase()}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs text-purple-300">
            {sourceContext.features.map((f) => f.value).join(' • ')}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-purple-300 mb-2">
            Target Context
          </h4>
          <select
            value={targetContext.id}
            onChange={(e) =>
              setTargetContext(contexts.find((c) => c.id === e.target.value)!)
            }
            className="w-full p-3 bg-white/10 border border-purple-500/30 rounded-lg text-white"
          >
            {contexts.map((ctx) => (
              <option key={ctx.id} value={ctx.id}>
                {ctx.name.replace(/_/g, ' ').toUpperCase()}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs text-purple-300">
            {targetContext.features.map((f) => f.value).join(' • ')}
          </div>
        </div>
      </div>

      {/* Transfer Button */}
      <button
        onClick={handleTransfer}
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all"
      >
        Transfer Habits →
      </button>

      {/* Transfer Results */}
      {transfers.length > 0 && (
        <div className="bg-white/5 p-6 rounded-lg border border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">
            Transferred Habit Patterns
          </h3>
          <div className="space-y-3">
            {transfers.map((transfer, index) => (
              <div
                key={transfer.itemId}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {movieNames[transfer.itemId] || transfer.itemId}
                    </div>
                    <div className="text-xs text-purple-300">
                      {transfer.itemId}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-300">
                      {(transfer.transferScore * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-purple-400">
                      transfer score
                    </div>
                  </div>
                  <div className="w-24 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, transfer.transferScore * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <h4 className="text-sm font-semibold text-green-300 mb-2">
          🧠 Compositional Transfer Mechanism
        </h4>
        <p className="text-xs text-green-200">
          Transfer score = Habit Strength × Context Similarity. The system identifies
          common features between source and target contexts (e.g., both are "home"
          + "evening"), then transfers behavioral patterns based on feature overlap.
          This demonstrates compositional generalization: decomposing contexts into
          features, then recomposing them to predict behavior in novel situations.
        </p>
      </div>
    </div>
  );
};

export default TransferLearning;
