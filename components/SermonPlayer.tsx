'use client'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

interface SermonPlayerProps {
  audioUrl: string
  title: string
  speaker: string
}

export default function SermonPlayer({ audioUrl, title, speaker }: SermonPlayerProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-sm text-gray-600">{speaker}</p>
      </div>
      <AudioPlayer
        src={audioUrl}
        autoPlayAfterSrcChange={false}
        showJumpControls={true}
        customAdditionalControls={[]}
        customVolumeControls={[]}
        className="sermon-player"
      />
      <style jsx global>{`
        .sermon-player {
          box-shadow: none;
          border-radius: 8px;
          background-color: #f9fafb;
        }
        .sermon-player .rhap_container {
          padding: 0;
        }
        .sermon-player .rhap_main-controls-button {
          color: #2563eb;
        }
        .sermon-player .rhap_progress-indicator,
        .sermon-player .rhap_progress-filled {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  )
}