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
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">{title}</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm space-y-1 min-h-[140px]">
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
    { output: "git: 'psuh' is not a git command. Did you mean 'push'?", delay: 500 },
    { prompt: '$', command: 'oops', delay: 600 },
    { output: 'git push [enter/↑/↓/ctrl+c]', delay: 1500 },
    { prompt: '$', command: 'gti status', delay: 800 },
    { output: "bash: gti: command not found", delay: 500 },
    { prompt: '$', command: 'oops', delay: 600 },
    { output: 'git status [enter/↑/↓/ctrl+c]', delay: 2000 },
  ];

  return <TerminalAnimation lines={lines} title="oops — Typo Corrector" />;
}

// YouTube Audio extension preview
export function YouTubeAudioPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#0f0f0f] border border-[#3a3a3a] shadow-xl">
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

      {/* YouTube-style content */}
      <div className="p-4 min-h-[140px] flex flex-col items-center justify-center">
        <motion.div 
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1" />
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
                animate={{ height: [8, 20, 12, 24, 8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
          <span className="text-xs text-[#a0a0a0]">Audio Only Mode</span>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Video disabled • Saving bandwidth
          </p>
        </div>
      </div>
    </div>
  );
}
