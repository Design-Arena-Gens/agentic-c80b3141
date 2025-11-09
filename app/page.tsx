'use client';

import { useState, useEffect } from 'react';
import { CARSEngine } from '@/lib/carsEngine';
import { generateMockData, generateTestContexts } from '@/lib/mockData';
import { Context } from '@/lib/types';
import ContextSelector from '@/components/ContextSelector';
import RecommendationPanel from '@/components/RecommendationPanel';
import HabitVisualization from '@/components/HabitVisualization';
import TransferLearning from '@/components/TransferLearning';

export default function Home() {
  const [engine, setEngine] = useState<CARSEngine | null>(null);
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);
  const [testContexts, setTestContexts] = useState<Context[]>([]);
  const [isTraining, setIsTraining] = useState(true);

  useEffect(() => {
    // Initialize and train the engine
    const initializeEngine = async () => {
      setIsTraining(true);

      const carsEngine = new CARSEngine();
      const trainingData = generateMockData();

      // Simulate training delay
      await new Promise(resolve => setTimeout(resolve, 500));

      carsEngine.train(trainingData);

      setEngine(carsEngine);

      const contexts = generateTestContexts();
      setTestContexts(contexts);
      setSelectedContext(contexts[0]);

      setIsTraining(false);
    };

    initializeEngine();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Compositional Generalization in CARS
          </h1>
          <p className="text-xl text-purple-200 mb-2">
            Neuro-Symbolic AI for Context-Aware Recommendations
          </p>
          <p className="text-sm text-purple-300">
            Habit Model: H = C[B(R + PR)]
          </p>
        </header>

        {isTraining ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Training CARS Engine...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Context Selection */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Select Context
              </h2>
              <ContextSelector
                contexts={testContexts}
                selectedContext={selectedContext}
                onSelectContext={setSelectedContext}
              />
            </div>

            {/* Recommendations */}
            {selectedContext && engine && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">
                  2. Context-Aware Recommendations
                </h2>
                <RecommendationPanel
                  engine={engine}
                  context={selectedContext}
                />
              </div>
            )}

            {/* Habit Statistics */}
            {engine && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">
                  3. Habit Patterns Analysis
                </h2>
                <HabitVisualization engine={engine} />
              </div>
            )}

            {/* Transfer Learning */}
            {engine && testContexts.length >= 2 && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
                <h2 className="text-2xl font-bold text-white mb-4">
                  4. Compositional Transfer Learning
                </h2>
                <TransferLearning
                  engine={engine}
                  contexts={testContexts}
                />
              </div>
            )}

            {/* Methodology */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                Implementation Approach
              </h2>
              <div className="text-purple-100 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    1. Habit Modeling (H = C[B(R + PR)])
                  </h3>
                  <p className="text-sm">
                    • Context (C): Multi-dimensional vector (time, location, social, mood, weather)
                    <br />
                    • Behavior (B): User actions with items
                    <br />
                    • Repetition (R): Log-normalized frequency with diminishing returns
                    <br />
                    • Positive Reinforcement (PR): Normalized rating (0-1)
                    <br />
                    • Habit Strength: αR + βPR (α=0.5, β=0.5)
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    2. Compositional Generalization
                  </h3>
                  <p className="text-sm">
                    • Context Decomposition: Break contexts into atomic features
                    <br />
                    • Symbolic Rule Extraction: Association rule mining on context-behavior pairs
                    <br />
                    • Feature Composition: Combine features to predict novel contexts
                    <br />
                    • Transfer Learning: Map habits across contexts using feature overlap
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    3. Neuro-Symbolic Integration
                  </h3>
                  <p className="text-sm">
                    • Neural Component: Context similarity via cosine similarity
                    <br />
                    • Symbolic Component: Explicit IF-THEN rules for interpretability
                    <br />
                    • Hybrid Reasoning: Combine neural predictions with symbolic rules
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">
                    4. Evaluation Approach
                  </h3>
                  <p className="text-sm">
                    • Train on LDOS-CoMoDa dataset with known context-behavior pairs
                    <br />
                    • Test on novel contexts with partial feature overlap
                    <br />
                    • Measure: Accuracy, Precision@K, Context Transfer Score
                    <br />
                    • Baseline: Traditional CF vs Context-Aware vs Compositional
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-purple-300 text-sm">
          <p>
            Research Implementation: Compositional Generalization in CARS
          </p>
          <p className="mt-2">
            PhD Project • Neuro-Symbolic AI • LDOS-CoMoDa Dataset
          </p>
        </footer>
      </div>
    </div>
  );
}
