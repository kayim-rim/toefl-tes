'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Volume2, Loader2 } from 'lucide-react';

interface AudioPlayerProps {
  questionId: number;
  part: 'A' | 'B' | 'C';
  autoPlay?: boolean;
}

export function AudioPlayer({ questionId, part, autoPlay = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Construct audio URL based on part and question ID
  const getAudioUrl = () => {
    // Part A: questions 1-30, audio files: listening_A_q{id}.wav
    // Part B: questions 31-38, but audio uses B prefix with 1-based index within part
    // Part C: questions 39-50, but audio uses B prefix with 1-based index within part
    
    if (part === 'A') {
      return `/audio/listening_A_q${questionId}.wav`;
    } else if (part === 'B') {
      // Part B has questions 31-38, but audio files are listening_B_q1, listening_B_q2, etc.
      const partBIndex = questionId - 30; // 31 -> 1, 32 -> 2, etc.
      return `/audio/listening_B_q${partBIndex}.wav`;
    } else {
      // Part C: For now try the A prefix files
      return `/audio/listening_A_q${questionId}.wav`;
    }
  };

  const audioUrl = getAudioUrl();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Load the audio
    audio.load();

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (hasError) {
    return (
      <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-slate-400" />
        <span className="text-slate-400 text-sm">Audio tidak tersedia untuk soal ini</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-700/50 border border-blue-500/30 rounded-lg p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button
          onClick={togglePlay}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>

        {/* Progress Bar */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Restart Button */}
        <Button
          onClick={handleRestart}
          variant="outline"
          size="sm"
          className="border-slate-500 text-slate-300 hover:bg-slate-600"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Audio Label */}
      <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
        <Volume2 className="w-3 h-3" />
        <span>Listening Part {part} - Question {questionId}</span>
      </div>
    </div>
  );
}
