import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalAnimationProps {
  lines: {
    prompt?: string;
    command?: string;
    output?: string;
    delay?: number;
  }[];
  title?: string;
}

export function TerminalAnimation({ lines, title = 'terminal' }: TerminalAnimationProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentTyping, setCurrentTyping] = useState<string>('');
  const [typingIndex, setTypingIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      // Reset and loop after delay
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(0);
        setCurrentTyping('');
        setTypingIndex(0);
      }, 3000);
      return;
    }

    const currentLine = lines[visibleLines];
    
    if (currentLine?.command && typingIndex < currentLine.command.length) {
      // Type out character by character
      timeoutRef.current = setTimeout(() => {
        setCurrentTyping(currentLine.command!.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 50);
    } else if (currentLine?.command && typingIndex >= currentLine.command.length) {
      // Finished typing, show the line and move to next
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(visibleLines + 1);
        setCurrentTyping('');
        setTypingIndex(0);
      }, currentLine.delay || 500);
    } else {
      // No command, just show output
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(visibleLines + 1);
      }, currentLine?.delay || 500);
    }
  }, [visibleLines, typingIndex, lines]);

  const currentLine = lines[visibleLines];
  const isTyping = currentLine?.command && typingIndex < currentLine.command.length;

  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">{title}</span>
      </div>

      {/* Terminal Content - Fixed height to prevent flickering */}
      <div className="p-4 font-mono text-sm space-y-1 h-[140px] overflow-hidden">
        {lines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line.prompt && (
              <span className="text-[#27ca40]">{line.prompt}</span>
            )}
            {line.command && (
              <span className="text-[#e8e6e3]"> {line.command}</span>
            )}
            {line.output && (
              <div className="text-[#a0a0a0] ml-0 whitespace-pre-wrap">{line.output}</div>
            )}
          </motion.div>
        ))}
        
        {/* Currently typing line */}
        {currentLine && visibleLines < lines.length && currentLine.command && (
          <div>
            {currentLine.prompt && (
              <span className="text-[#27ca40]">{currentLine.prompt}</span>
            )}
            <span className="text-[#e8e6e3]"> {currentTyping}</span>
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-2 h-4 bg-[#e8e6e3] ml-0.5 align-middle"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Pre-configured animation for oops CLI tool
export function OopsTerminalAnimation() {
  const lines = [
    { prompt: '$', command: 'git psuh', delay: 800 },
    { output: "git: 'psuh' is not a git command.", delay: 400 },
    { output: "Did you mean 'push'?", delay: 500 },
    { prompt: '$', command: 'oops', delay: 600 },
    { output: 'git push [enter/↑/↓/ctrl+c]', delay: 1500 },
  ];

  return <TerminalAnimation lines={lines} title="oops — Typo Corrector" />;
}

// Pre-configured animation for fix CLI tool
export function FixTerminalAnimation() {
  const lines = [
    { prompt: '$', command: 'npm instal', delay: 800 },
    { output: "Unknown command: instal", delay: 500 },
    { prompt: '$', command: 'fix', delay: 600 },
    { output: '✨ npm install [y/n]', delay: 1500 },
  ];

  return <TerminalAnimation lines={lines} title="fix — AI Command Corrector" />;
}

// YouTube Audio extension preview - Fixed height
export function YouTubeAudioPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#0f0f0f] border border-[#3a3a3a] shadow-xl h-[180px]">
      {/* Browser chrome simulation */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#202020] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27ca40]" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-[#3a3a3a] rounded px-3 py-1 text-xs text-[#a0a0a0] flex items-center gap-2">
            <span>🔒</span>
            <span>youtube.com</span>
          </div>
        </div>
      </div>

      {/* YouTube-style content - Fixed height */}
      <div className="p-4 h-[140px] flex flex-col items-center justify-center">
        <motion.div 
          className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
        </motion.div>
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            className="flex gap-0.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-500 rounded-full"
                animate={{ height: [8, 16, 10, 20, 8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
          <span className="text-xs text-[#a0a0a0]">Audio Only Mode</span>
        </div>
        <p className="text-[10px] text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          Video disabled • Saving bandwidth
        </p>
      </div>
    </div>
  );
}

// Torrent DL / PyFlix streaming preview - Fixed height
export function TorrentStreamPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">torrent-dl — Streaming</span>
      </div>

      {/* Content - Fixed height */}
      <div className="p-4 h-[140px] flex flex-col justify-center">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
          </motion.div>
          <div className="flex-1">
            <div className="text-xs text-[#e8e6e3] mb-1">movie.mp4</div>
            <div className="h-1.5 bg-[#3a3a3a] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-green-400"
                initial={{ width: '0%' }}
                animate={{ width: ['15%', '45%', '75%', '100%', '15%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-[10px] text-[#707070]">
          <span>⬇ 2.4 MB/s</span>
          <span className="text-green-400">▶ Playing while downloading</span>
          <span>12 peers</span>
        </div>
      </div>
    </div>
  );
}

// Media Server preview - Fixed height
export function MediaServerPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">media-server — HTTP Stream</span>
      </div>

      {/* Content - Fixed height */}
      <div className="p-4 h-[140px] flex flex-col justify-center">
        <div className="flex items-center gap-4">
          {/* Server icon */}
          <motion.div
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
          
          <div className="flex-1">
            <div className="text-sm text-[#e8e6e3] mb-1">📡 Streaming to network</div>
            <div className="text-xs text-[#707070]">http://192.168.1.100:8080</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-3 text-[10px] text-[#707070]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            VLC Connected
          </span>
          <span>📁 /Movies</span>
          <span>3 devices</span>
        </div>
      </div>
    </div>
  );
}
