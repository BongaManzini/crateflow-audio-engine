package com.crateflow.app.model

data class DiscoveredPlaylist(
    val name: String,
    val platform: String,
    val followers: String,
    val genre: String
)

data class ConnectedTrack(
    val id: String,
    val title: String,
    val artist: String,
    val year: Int,
    val bpm: Int,
    val key: String,
    val coOccurrenceScore: Int,
    val genreCluster: String,
    val duration: String,
    val albumArtUrl: String,
    val isOriginalSample: Boolean = false,
    val blendedScore: Float = 0f,
    val youtubeVideoId: String = "",
    val pillowUrl: String? = null
)

data class SynthesizedPlaylist(
    val sourcePlaylists: List<DiscoveredPlaylist>,
    val tracks: List<ConnectedTrack>,
    val youtubeContinuousPlaylistUrl: String = ""
)
