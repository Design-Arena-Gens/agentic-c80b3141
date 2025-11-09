import React from 'react';
import { Context } from '@/lib/types';

interface Props {
  contexts: Context[];
  selectedContext: Context | null;
  onSelectContext: (context: Context) => void;
}

const ContextSelector: React.FC<Props> = ({
  contexts,
  selectedContext,
  onSelectContext,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contexts.map((context) => (
          <button
            key={context.id}
            onClick={() => onSelectContext(context)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedContext?.id === context.id
                ? 'border-purple-500 bg-purple-500/20'
                : 'border-purple-500/30 bg-white/5 hover:bg-white/10'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {context.name.replace(/_/g, ' ').toUpperCase()}
            </h3>
            <div className="space-y-1 text-sm">
              {context.features.map((feature) => (
                <div key={feature.dimension} className="flex justify-between">
                  <span className="text-purple-300">{feature.dimension}:</span>
                  <span className="text-white">{feature.value}</span>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selectedContext && (
        <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">
            Context Feature Vector
          </h4>
          <div className="flex gap-2 flex-wrap">
            {selectedContext.features.map((feature) => (
              <span
                key={feature.dimension}
                className="px-3 py-1 bg-purple-500/30 rounded-full text-xs text-white"
              >
                {feature.dimension}: {feature.value} (w={feature.weight})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextSelector;
