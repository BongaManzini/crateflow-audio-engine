package com.crateflow.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.crateflow.app.audio.DspCrossfader
import com.crateflow.app.data.PlaylistSynthesizer
import com.crateflow.app.data.SampleRepository
import com.crateflow.app.model.SamplePair
import com.crateflow.app.model.SynthesizedPlaylist
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class CrateFlowUiState(
    val activePair: SamplePair,
    val allPairs: List<SamplePair>,
    val crossfade: Float = 0f,
    val isPlaying: Boolean = false,
    val isTransitioning: Boolean = false,
    val transitionProgress: Float = 0f,
    val transitionStage: String = "",
    val consensusRatio: Float = 0.5f,
    val harmonicFlow: Boolean = true,
    val synthesizedPlaylist: SynthesizedPlaylist,
    val isListening: Boolean = false,
    val nudgeOffset: Float = 0f
)

class CrateFlowViewModel(
    private val repository: SampleRepository = SampleRepository()
) : ViewModel() {

    private val _activePair = MutableStateFlow(repository.samples.value.first())
    private val _crossfade = MutableStateFlow(0f)
    private val _isPlaying = MutableStateFlow(false)
    private val _isTransitioning = MutableStateFlow(false)
    private val _transitionProgress = MutableStateFlow(0f)
    private val _transitionStage = MutableStateFlow("")
    private val _consensusRatio = MutableStateFlow(0.5f)
    private val _harmonicFlow = MutableStateFlow(true)
    private val _isListening = MutableStateFlow(false)
    private val _nudgeOffset = MutableStateFlow(0f)

    val uiState: StateFlow<CrateFlowUiState> = combine(
        repository.samples,
        _activePair,
        _crossfade,
        _isPlaying,
        _isTransitioning,
        _transitionProgress,
        _transitionStage,
        _consensusRatio,
        _harmonicFlow,
        _isListening,
        _nudgeOffset
    ) { params ->
        val allPairs = params[0] as List<SamplePair>
        val active = params[1] as SamplePair
        val crossfade = params[2] as Float
        val playing = params[3] as Boolean
        val transitioning = params[4] as Boolean
        val progress = params[5] as Float
        val stage = params[6] as String
        val consensus = params[7] as Float
        val harmonic = params[8] as Boolean
        val listening = params[9] as Boolean
        val nudge = params[10] as Float

        val playlist = PlaylistSynthesizer.synthesize(consensus, harmonic)

        CrateFlowUiState(
            activePair = active,
            allPairs = allPairs,
            crossfade = crossfade,
            isPlaying = playing,
            isTransitioning = transitioning,
            transitionProgress = progress,
            transitionStage = stage,
            consensusRatio = consensus,
            harmonicFlow = harmonic,
            synthesizedPlaylist = playlist,
            isListening = listening,
            nudgeOffset = nudge
        )
    }.stateIn(
        viewModelScope,
        SharingStarted.WhileSubscribed(5000),
        CrateFlowUiState(
            activePair = repository.samples.value.first(),
            allPairs = repository.samples.value,
            synthesizedPlaylist = PlaylistSynthesizer.synthesize()
        )
    )

    fun selectPair(pair: SamplePair) {
        _activePair.value = pair
        _crossfade.value = 0f
        _nudgeOffset.value = 0f
    }

    fun setCrossfade(value: Float) {
        _crossfade.value = value.coerceIn(0f, 1f)
    }

    fun togglePlay() {
        _isPlaying.value = !_isPlaying.value
    }

    fun startAutoTransition() {
        if (_isTransitioning.value) return
        _isPlaying.value = true
        _isTransitioning.value = true
        _transitionProgress.value = 0f

        viewModelScope.launch {
            DspCrossfader.executeTransition(durationMs = 4000L) { progress, easedX, stage ->
                _transitionProgress.value = progress
                _crossfade.value = easedX
                _transitionStage.value = stage.description
            }
            _isTransitioning.value = false
            _transitionStage.value = ""
        }
    }

    fun nudge(delta: Float) {
        _nudgeOffset.value = Math.round((_nudgeOffset.value + delta) * 10f) / 10f
    }

    fun toggleHarmonicFlow() {
        _harmonicFlow.value = !_harmonicFlow.value
    }

    fun setConsensusRatio(ratio: Float) {
        _consensusRatio.value = ratio.coerceIn(0f, 1f)
    }

    fun upvoteCurrent() {
        repository.upvoteSample(_activePair.value.id)
    }

    fun addSample(newPair: SamplePair) {
        repository.addSample(newPair)
        selectPair(newPair)
    }

    fun startAmbientListen() {
        if (_isListening.value) return
        _isListening.value = true
        viewModelScope.launch {
            delay(2400) // Acoustic fingerprint matching simulation
            _isListening.value = false
            val all = repository.samples.value
            val nextIndex = (all.indexOfFirst { it.id == _activePair.value.id } + 1) % all.size
            selectPair(all[nextIndex])
        }
    }
}
