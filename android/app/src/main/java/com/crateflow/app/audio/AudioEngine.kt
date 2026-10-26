package com.crateflow.app.audio

import android.content.Context
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class AudioEngine(private val context: Context) {

    private var playerA: ExoPlayer? = null
    private var playerB: ExoPlayer? = null

    private val _isPlaying = MutableStateFlow(false)
    val isPlaying: StateFlow<Boolean> = _isPlaying.asStateFlow()

    private val _crossfade = MutableStateFlow(0f)
    val crossfade: StateFlow<Float> = _crossfade.asStateFlow()

    fun initialize() {
        if (playerA == null) {
            playerA = ExoPlayer.Builder(context).build().apply {
                repeatMode = ExoPlayer.REPEAT_MODE_ALL
            }
        }
        if (playerB == null) {
            playerB = ExoPlayer.Builder(context).build().apply {
                repeatMode = ExoPlayer.REPEAT_MODE_ALL
            }
        }
    }

    fun setCrossfade(value: Float) {
        val clamped = value.coerceIn(0f, 1f)
        _crossfade.value = clamped
        val (gainA, gainB) = DspCrossfader.calculateGains(clamped)
        playerA?.volume = gainA
        playerB?.volume = gainB
    }

    fun seekToCue(cueSecondsA: Float, cueSecondsB: Float) {
        playerA?.seekTo((cueSecondsA * 1000).toLong())
        playerB?.seekTo((cueSecondsB * 1000).toLong())
    }

    fun togglePlay() {
        if (_isPlaying.value) {
            playerA?.pause()
            playerB?.pause()
            _isPlaying.value = false
        } else {
            playerA?.play()
            playerB?.play()
            _isPlaying.value = true
        }
    }

    fun release() {
        playerA?.release()
        playerB?.release()
        playerA = null
        playerB = null
    }
}
