import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useEffect, useRef, useCallback } from 'react';

export interface UserPreferences {
  id: string;
  user_id: string;
  sound_enabled: boolean;
  ambient_sound: 'none' | 'rain' | 'cafe' | 'space' | 'nature';
  theme: string;
  dashboard_layout: Record<string, any>;
  discovered_easter_eggs: string[];
}

// Audio URLs for ambient sounds
const AMBIENT_SOUNDS: Record<string, string> = {
  rain: 'https://cdn.pixabay.com/audio/2022/05/16/audio_fe1c51ad42.mp3',
  cafe: 'https://cdn.pixabay.com/audio/2022/10/31/audio_946d5e5f2f.mp3',
  space: 'https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749d484.mp3',
  nature: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3',
};

// UI Sound effects
const UI_SOUNDS = {
  click: 'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...',
  success: '/sounds/success.mp3',
  achievement: '/sounds/achievement.mp3',
};

export function usePreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['user-preferences', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserPreferences | null;
    },
    enabled: !!user,
  });

  const updatePreferences = useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      if (!user) throw new Error('Not authenticated');
      
      const { error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('user_id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
    },
  });

  const discoverEasterEgg = useMutation({
    mutationFn: async (eggId: string) => {
      if (!user || !preferences) throw new Error('Not ready');
      
      if (preferences.discovered_easter_eggs?.includes(eggId)) {
        return false; // Already discovered
      }
      
      const newEggs = [...(preferences.discovered_easter_eggs || []), eggId];
      
      const { error } = await supabase
        .from('user_preferences')
        .update({ discovered_easter_eggs: newEggs })
        .eq('user_id', user.id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: (isNew) => {
      if (isNew) {
        queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
      }
    },
  });

  // Ambient sound control
  useEffect(() => {
    if (!preferences) return;
    
    if (preferences.ambient_sound === 'none' || !preferences.sound_enabled) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return;
    }
    
    const soundUrl = AMBIENT_SOUNDS[preferences.ambient_sound];
    if (!soundUrl) return;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(soundUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.play().catch(() => {
      // Auto-play was prevented, need user interaction
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [preferences?.ambient_sound, preferences?.sound_enabled]);

  const playSound = useCallback((sound: 'click' | 'success' | 'achievement') => {
    if (!preferences?.sound_enabled) return;
    
    // Simple beep for now - could be expanded with actual sound files
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequencies = {
      click: 800,
      success: 1200,
      achievement: 1500,
    };
    
    oscillator.frequency.value = frequencies[sound];
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }, [preferences?.sound_enabled]);

  return {
    preferences,
    isLoading,
    updatePreferences: updatePreferences.mutate,
    discoverEasterEgg: discoverEasterEgg.mutate,
    playSound,
    hasDiscovered: (eggId: string) => preferences?.discovered_easter_eggs?.includes(eggId) || false,
  };
}
