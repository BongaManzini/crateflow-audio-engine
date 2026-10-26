package com.crateflow.app.audio

import kotlinx.coroutines.delay
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.pow
import kotlin.math.sin

object DspCrossfader {

    /**
     * Constant-power crossfade curve:
     * GainA = cos(crossfade * PI / 2)
     * GainB = sin(crossfade * PI / 2)
     * Ensures volume doesn't drop in the center detent position.
     */
    fun calculateGains(crossfade: Float): Pair<Float, Float> {
        val clamped = crossfade.coerceIn(0f, 1f)
        val angle = clamped * (PI.toFloat() / 2f)
        val gainA = cos(angle)
        val gainB = sin(angle)
        return Pair(gainA, gainB)
    }

    sealed class TransitionStage(val description: String) {
        object HighCutSweep : TransitionStage("Phase 1: High-Cut Sweep")
        object BassSwap : TransitionStage("Phase 2: Bass Swap")
        object SampleDrop : TransitionStage("Phase 3: Drop into Sample!")
        object Completed : TransitionStage("Transition Complete")
    }

    /**
     * Executes the 4-bar automated DJ transition using pure deterministic DSP.
     * Zero AI - instant, lightweight, and runs on-device.
     */
    suspend fun executeTransition(
        durationMs: Long = 4000L,
        onProgress: (progress: Float, crossfade: Float, stage: TransitionStage) -> Unit
    ) {
        val steps = 60
        val stepDelay = durationMs / steps

        for (i in 0..steps) {
            val progress = i.toFloat() / steps.toFloat()

            // Cubic easing for smooth tactile DJ transition
            val easedCrossfade = if (progress < 0.5f) {
                4f * progress * progress * progress
            } else {
                1f - (-2f * progress + 2f).pow(3) / 2f
            }

            val stage = when {
                progress < 0.35f -> TransitionStage.HighCutSweep
                progress < 0.75f -> TransitionStage.BassSwap
                progress < 1.0f -> TransitionStage.SampleDrop
                else -> TransitionStage.Completed
            }

            onProgress(progress, easedCrossfade, stage)
            delay(stepDelay)
        }
    }
}
