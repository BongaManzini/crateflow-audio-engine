package com.crateflow.app.model

data class Track(
    val title: String,
    val artist: String,
    val year: Int,
    val album: String,
    val albumArtUrl: String,
    val genre: String,
    val bpm: Int,
    val key: String, // e.g. "8A"
    val cueSeconds: Float,
    val durationSeconds: Int,
    val sampleDescription: String,
    val isOriginalSample: Boolean = false,
    val youtubeId: String = ""
)
