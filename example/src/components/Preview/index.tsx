import { observer, useCollector } from '@rekajs/react';
import * as t from '@rekajs/types';
import * as React from 'react';

import { Renderer, RenderFrame } from '../Renderer';

const FRAMES = [
  {
    id: 'Main App',
    component: {
      name: 'App',
      props: {},
    },
  },
  {
    id: 'Primary Button',
    component: {
      name: 'Button',
      props: {
        text: t.literal({ value: 'A Primary Button!' }),
      },
    },
  },
];
export const Preview = observer(() => {
  const { reka } = useCollector();

  const [selectedFrameId, setSelectedFrameId] = React.useState<string | null>(
    FRAMES[0].id
  );

  const selectedFrame = React.useMemo(() => {
    return FRAMES.find((frame) => frame.id === selectedFrameId);
  }, [selectedFrameId]);

  const selectedRekaFrame = React.useMemo(() => {
    if (!selectedFrame) {
      return;
    }

    let rekaFrame = reka.frames.find((frame) => frame.id === selectedFrame.id);

    if (!rekaFrame) {
      rekaFrame = reka.createFrame(selectedFrame);
    }

    return rekaFrame;
  }, [selectedFrame]);

  return (
    <div className="w-full h-full flex flex-col text-xs">
      <div className="px-2 py-2 border-b-2">
        <select
          onChange={(e) => {
            setSelectedFrameId(e.target.value);
          }}
        >
          {FRAMES.map((frame) => (
            <option key={frame.id} value={frame.id}>
              {frame.id}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 px-2 py-2">
        {selectedRekaFrame ? (
          <RenderFrame frame={selectedRekaFrame} />
        ) : (
          <div className="px-3 py-4">No frame selected</div>
        )}
      </div>
    </div>
  );
});