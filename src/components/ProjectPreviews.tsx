import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalAnimationProps {
  lines: {
    prompt?: string;
    command?: string;
    output?: string;
    outputColor?: string;
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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(0);
        setCurrentTyping('');
        setTypingIndex(0);
      }, 3000);
      return;
    }

    const currentLine = lines[visibleLines];
    
    if (currentLine?.command && typingIndex < currentLine.command.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentTyping(currentLine.command!.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, 50);
    } else if (currentLine?.command && typingIndex >= currentLine.command.length) {
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(visibleLines + 1);
        setCurrentTyping('');
        setTypingIndex(0);
      }, currentLine.delay || 500);
    } else {
      timeoutRef.current = setTimeout(() => {
        setVisibleLines(visibleLines + 1);
      }, currentLine?.delay || 500);
    }
  }, [visibleLines, typingIndex, lines]);

  const currentLine = lines[visibleLines];
  const isTyping = currentLine?.command && typingIndex < currentLine.command.length;

  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">{title}</span>
      </div>

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
              <div className={`ml-0 whitespace-pre-wrap ${line.outputColor || 'text-[#a0a0a0]'}`}>{line.output}</div>
            )}
          </motion.div>
        ))}
        
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

// Oops CLI - Rule-based typo corrector (175+ rules, Rust, fast)
export function OopsTerminalAnimation() {
  const lines = [
    { prompt: '$', command: 'git psuh origin main', delay: 600 },
    { output: "git: 'psuh' is not a git command.", delay: 300 },
    { prompt: '$', command: 'oops', delay: 500 },
    { output: '→ git push origin main', outputColor: 'text-green-400', delay: 1500 },
  ];

  return <TerminalAnimation lines={lines} title="oops — 175+ Rules • Sub-50ms" />;
}

// Fix CLI - AI/LLM-powered command corrector (local model, no API)
export function FixTerminalAnimation() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">fix — Local LLM • Offline</span>
      </div>
      
      <div className="p-4 h-[140px] flex flex-col justify-center">
        <div className="font-mono text-sm space-y-2">
          <div className="text-[#a0a0a0]">$ kubctl get pods</div>
          <div className="text-red-400 text-xs">command not found: kubctl</div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-purple-400"
            >
              ✨
            </motion.div>
            <span className="text-[#a0a0a0]">fix</span>
            <motion.span
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-purple-400"
            >
              thinking...
            </motion.span>
          </div>
          <motion.div
            animate={{ opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-green-400"
          >
            → kubectl get pods [y/n]
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// YouTube Audio - Firefox extension with audio visualizer
export function YouTubeAudioPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#0f0f0f] border border-[#3a3a3a] shadow-xl h-[180px]">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#202020] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27ca40]" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-[#3a3a3a] rounded px-3 py-1 text-xs text-[#a0a0a0] flex items-center gap-2">
            <span>🦊</span>
            <span>youtube.com/watch?v=...</span>
          </div>
        </div>
      </div>

      <div className="p-4 h-[140px] flex flex-col items-center justify-center">
        <motion.div 
          className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1" />
        </motion.div>
        <div className="flex items-center gap-3 mb-2">
          <motion.div className="flex gap-0.5 items-end h-5">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-green-500 rounded-sm"
                animate={{ height: [4, 8 + i * 2, 6, 14 + i, 4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </motion.div>
          <span className="text-xs text-[#a0a0a0]">Audio Only</span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Video OFF
          </span>
          <span className="text-[#707070]">🔋 Saving 80% battery</span>
        </div>
      </div>
    </div>
  );
}

// Torrent DL - CLI torrent streamer with VLC playback
export function TorrentDLPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">torrent-dl • VLC</span>
      </div>

      <div className="p-3 h-[140px] flex flex-col justify-between font-mono text-xs">
        <div className="text-[#a0a0a0]">$ torrent-dl magnet:?xt=urn:...</div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-[#707070]">BigBuckBunny.mp4</span>
            <span className="text-green-400">42%</span>
          </div>
          <div className="h-2 bg-[#3a3a3a] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
              initial={{ width: '10%' }}
              animate={{ width: ['10%', '42%', '78%', '100%'] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#707070]">
            <span>↓ 3.2 MB/s</span>
            <span>24 peers</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-[#3a3a3a]">
          <motion.div
            className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
          </motion.div>
          <span className="text-green-400 text-[10px]">▶ Playing in VLC while downloading</span>
        </div>
      </div>
    </div>
  );
}

// PyFlix - Python torrent streaming library (code/API focus)
export function PyFlixPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">pyflix — Python Library</span>
      </div>

      <div className="p-3 h-[140px] font-mono text-xs overflow-hidden">
        <motion.div
          animate={{ opacity: [0.7, 1, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="space-y-1"
        >
          <div><span className="text-purple-400">from</span> <span className="text-green-400">pyflix</span> <span className="text-purple-400">import</span> <span className="text-yellow-300">Torrent</span></div>
          <div className="text-[#707070]"># Sequential streaming for video</div>
          <div><span className="text-[#e8e6e3]">t = Torrent(magnet_url)</span></div>
          <div><span className="text-[#e8e6e3]">t.</span><span className="text-yellow-300">stream</span><span className="text-[#e8e6e3]">()</span></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="text-green-400 mt-2"
          >
            ✓ MOOV atom detected • Ready to play
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// Media Server - HTTP server for VLC with playlist
export function MediaServerPreview() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#1e1e1e] dark:bg-[#0d0d0d] border border-[#3a3a3a] shadow-xl h-[180px]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#2d2d2d] dark:bg-[#1a1a1a] border-b border-[#3a3a3a]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <span className="text-xs text-[#808080] ml-2 font-mono">videopy serve</span>
      </div>

      <div className="p-3 h-[140px] flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-sm">📡</span>
            </div>
            <div>
              <div className="text-xs text-[#e8e6e3]">Media Server</div>
              <div className="text-[10px] text-[#707070]">:1149</div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Online
          </div>
        </div>

        <div className="flex-1 space-y-1 text-[10px] overflow-hidden">
          <div className="text-[#707070] mb-1">📁 /home/media/Movies</div>
          {['Inception.mkv', 'Interstellar.mp4', 'Avatar.mkv'].map((file, i) => (
            <motion.div
              key={file}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center justify-between px-2 py-1 bg-[#2a2a2a] rounded"
            >
              <span className="text-[#e8e6e3]">🎬 {file}</span>
              <span className="text-[#707070]">→ VLC</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
