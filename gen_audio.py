#!/usr/bin/env python3
"""Generate promotional audio assets for Sapphire Studios promo.

Main track: punchy electronic promo music with act-synced dynamics.
SFX: impact hits (word reveals), transition whoosh, brand reveal stab.
"""

import math
import wave
import struct
import subprocess
import array
import os

SR = 48000
PI2 = 2.0 * math.pi

def clamp(x, lo=0.0, hi=1.0):
    return max(lo, min(hi, x))

def env_in(t, dur=0.3):
    return clamp(t / dur)

def env_window(t, start, end, fade=0.2):
    return clamp((t - start) / fade) * clamp((end - t) / fade)


# --------------------------------------------------------------------------
# Tiny deterministic LCG noise source
# --------------------------------------------------------------------------
class LCG:
    def __init__(self, seed: int = 1):
        self.state = seed & 0xFFFFFFFF

    def next(self) -> float:
        self.state = (1664525 * self.state + 1013904223) & 0xFFFFFFFF
        return (self.state / 0x80000000) - 1.0  # -1..1


def to_wav(path: str, mono_samples: list, sr: int = SR) -> None:
    n = len(mono_samples)
    peak = max(abs(x) for x in mono_samples) or 1.0
    scale = 0.88 / peak
    ints = array.array('h', (int(clamp(s * scale, -1.0, 1.0) * 32767) for s in mono_samples))
    with wave.open(path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(ints.tobytes())


def wav_to_mp3(src: str, dst: str, extra_af: str = "") -> None:
    af = "aformat=channel_layouts=stereo"
    if extra_af:
        af += "," + extra_af
    subprocess.run(
        ["ffmpeg", "-y", "-i", src, "-af", af,
         "-ar", "48000", "-ac", "2", "-b:a", "192k", dst],
        check=True, capture_output=True,
    )


# ==========================================================================
# 1. MAIN PROMOTIONAL MUSIC TRACK  (20 s)
# ==========================================================================
def gen_music() -> list:
    N = int(SR * 20.0)
    rng_hat   = LCG(42)
    rng_snare = LCG(137)
    out = []

    for i in range(N):
        t = i / SR
        s = 0.0

        # ---- KICK DRUM (120 BPM = every 0.5s, phase-correct sweep) --------
        bt = t % 0.5
        kick_phase = PI2 * (5.0 * (1.0 - math.exp(-20.0 * bt)) + 50.0 * bt)
        s += 0.52 * math.sin(kick_phase) * math.exp(-25.0 * bt)

        # ---- HI-HAT (every 0.25 s = 16th notes) ----------------------------
        ht = t % 0.25
        s += rng_hat.next() * math.exp(-90.0 * ht) * 0.11

        # ---- SNARE (on beats 2 & 4 = every 1.0s offset 0.5s) ---------------
        snt = (t - 0.5) % 1.0
        s += rng_snare.next() * math.exp(-18.0 * snt) * 0.26

        # ---- BASS LINE (55 Hz + harmonics, fades in 0-0.5s) ----------------
        b_env = env_in(t, 0.5)
        s += b_env * (0.24 * math.sin(PI2 * 55 * t)
                      + 0.10 * math.sin(PI2 * 110 * t)
                      + 0.04 * math.sin(PI2 * 165 * t))

        # ---- TENSION LAYER (3.5–7.0s): double kick + dissonant tone --------
        ten = env_window(t, 3.5, 7.0, 0.3)
        if ten > 0.001:
            fbt = t % 0.25
            fp  = PI2 * (5.0 * (1.0 - math.exp(-20.0 * fbt)) + 50.0 * fbt)
            s += ten * 0.28 * math.sin(fp) * math.exp(-25.0 * fbt)   # faster kick
            s += ten * 0.13 * math.sin(PI2 * 311.13 * t)             # Eb4 dissonance

        # ---- CHORD PAD (Am: A-C-E, enters at 7.0s, 1.5s fade-in) ----------
        ch = clamp((t - 7.0) * (1.0 / 1.5))
        if ch > 0.001:
            s += ch * 0.08 * (
                math.sin(PI2 * 220.00 * t) +
                0.90 * math.sin(PI2 * 261.63 * t) +
                0.80 * math.sin(PI2 * 329.63 * t) +
                0.45 * math.sin(PI2 * 440.00 * t)
            )

        # ---- AUTHORITY RICHNESS (12.5–20s): octave + shimmer ---------------
        auth = clamp((t - 12.5) * 2.0)
        if auth > 0.001:
            s += auth * 0.05 * math.sin(PI2 * 880 * t) * (0.5 + 0.5 * math.sin(PI2 * 8 * t))

        # ---- CTA RISE (16.5–20s): high sizzle ------------------------------
        cta_r = clamp((t - 16.5) * 3.0)
        if cta_r > 0.001:
            s += cta_r * 0.04 * math.sin(PI2 * 1320 * t) * (0.5 + 0.5 * math.sin(PI2 * 12 * t))

        # ---- FADE OUT (17.5–20s) -------------------------------------------
        s *= clamp((20.0 - t) / 2.5)

        out.append(s)
    return out


# ==========================================================================
# 2. SFX — SHORT WORD-REVEAL IMPACT  (0.3 s)
# ==========================================================================
def gen_sfx_impact() -> list:
    N = int(SR * 0.30)
    out = []
    rng = LCG(999)
    for i in range(N):
        t = i / SR
        env = math.exp(-30.0 * t)
        # Freq-swept thud (150→60 Hz)
        phase = PI2 * (6.0 * (1.0 - math.exp(-25.0 * t)) + 60.0 * t)
        body  = math.sin(phase) * env * 0.8
        # Transient click layer
        click = rng.next() * math.exp(-200.0 * t) * 0.3
        # 1kHz ping
        ping  = math.sin(PI2 * 1000 * t) * math.exp(-60.0 * t) * 0.2
        out.append(body + click + ping)
    return out


# ==========================================================================
# 3. SFX — SCENE-TRANSITION WHOOSH  (0.7 s)
# ==========================================================================
def gen_sfx_whoosh() -> list:
    N = int(SR * 0.70)
    out = []
    rng = LCG(777)
    for i in range(N):
        t = i / SR
        # Attack-decay envelope (shaped like a swoosh)
        env = (t / 0.12) * math.exp(1.0 - t / 0.12) * 0.5
        env = clamp(env, -2.0, 2.0)
        # Filtered noise
        noise = rng.next()
        # Rising-pitch layer for whoosh feel
        sweep_freq = 200.0 + 2800.0 * (t / 0.7) ** 2
        tone = math.sin(PI2 * sweep_freq * t) * math.exp(-4.0 * t) * 0.3
        out.append((noise * 0.55 + tone) * env)
    return out


# ==========================================================================
# 4. SFX — BRAND-REVEAL ORCHESTRAL STAB  (1.8 s)
# ==========================================================================
def gen_sfx_stab() -> list:
    N = int(SR * 1.80)
    out = []
    for i in range(N):
        t = i / SR
        # Attack transient (0-0.05s) + sustain decay
        att  = env_in(t, 0.04)
        body_env = att * math.exp(-1.8 * t)
        # Am chord voicing with overtones
        chord = (
            math.sin(PI2 * 110.00 * t) +          # A2 bass
            0.9 * math.sin(PI2 * 220.00 * t) +    # A3
            0.8 * math.sin(PI2 * 261.63 * t) +    # C4
            0.7 * math.sin(PI2 * 329.63 * t) +    # E4
            0.5 * math.sin(PI2 * 440.00 * t) +    # A4
            0.25 * math.sin(PI2 * 523.25 * t)     # C5 shimmer
        )
        # Sub-bass boom
        sub_env = math.exp(-5.0 * t)
        sub = 0.5 * math.sin(PI2 * 55 * t) * sub_env
        out.append((chord * body_env * 0.12) + sub)
    return out


# ==========================================================================
# MAIN
# ==========================================================================
if __name__ == "__main__":
    os.makedirs("assets", exist_ok=True)

    print("Generating main music track (20s)...")
    wav_to_mp3_af = (
        "highpass=f=25,"
        "acompressor=threshold=-16dB:ratio=4:attack=3:release=100,"
        "volume=0.72"
    )
    to_wav("/tmp/music.wav", gen_music())
    wav_to_mp3("/tmp/music.wav", "assets/music.mp3", wav_to_mp3_af)
    print("  -> assets/music.mp3 done")

    print("Generating sfx-impact.mp3...")
    to_wav("/tmp/sfx_impact.wav", gen_sfx_impact())
    wav_to_mp3("/tmp/sfx_impact.wav", "assets/sfx-impact.mp3",
               "highpass=f=60,volume=0.9")
    print("  -> assets/sfx-impact.mp3 done")

    print("Generating sfx-whoosh.mp3...")
    to_wav("/tmp/sfx_whoosh.wav", gen_sfx_whoosh())
    wav_to_mp3("/tmp/sfx_whoosh.wav", "assets/sfx-whoosh.mp3",
               "bandpass=f=1000:width_type=o:w=3,volume=1.1")
    print("  -> assets/sfx-whoosh.mp3 done")

    print("Generating sfx-stab.mp3...")
    to_wav("/tmp/sfx_stab.wav", gen_sfx_stab())
    wav_to_mp3("/tmp/sfx_stab.wav", "assets/sfx-stab.mp3",
               "highpass=f=30,acompressor=threshold=-12dB:ratio=3:attack=1:release=200,volume=0.85")
    print("  -> assets/sfx-stab.mp3 done")

    print("\nAll audio assets generated.")
