package com.crateflow.app.data

import com.crateflow.app.model.CamelotWheel
import com.crateflow.app.model.ConnectedTrack
import com.crateflow.app.model.DiscoveredPlaylist
import com.crateflow.app.model.SynthesizedPlaylist

object PlaylistSynthesizer {

    private val samplePoolPlaylists = listOf(
        DiscoveredPlaylist("Conscious Hip-Hop Masterpieces", "Spotify", "340K", "Conscious Rap"),
        DiscoveredPlaylist("Late Night Jazz & Dusty Samples", "YouTube Music", "185K", "Soul Jazz"),
        DiscoveredPlaylist("Lofi Study Beats & Soul Chops", "Spotify", "920K", "Lo-Fi"),
        DiscoveredPlaylist("Blue Note Vinyl Archive", "YouTube", "65K", "Jazz / Vinyl")
    )

    private val candidateTracks = listOf(
        ConnectedTrack(
            id = "tr-1",
            title = "Maybe Tomorrow",
            artist = "Grant Green",
            year = 1971,
            bpm = 74,
            key = "8A",
            coOccurrenceScore = 98,
            genreCluster = "Vintage Soul / Jazz",
            duration = "5:21",
            albumArtUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80",
            isOriginalSample = true,
            youtubeVideoId = "T-iZF2LyxIs"
        ),
        ConnectedTrack(
            id = "tr-2",
            title = "Sing About Me, I'm Dying of Thirst",
            artist = "Kendrick Lamar",
            year = 2012,
            bpm = 74,
            key = "8A",
            coOccurrenceScore = 96,
            genreCluster = "Conscious Rap",
            duration = "12:03",
            albumArtUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&auto=format&fit=crop&q=80",
            youtubeVideoId = "mIFAomeTBBM"
        ),
        ConnectedTrack(
            id = "tr-3",
            title = "Through the Wire",
            artist = "Kanye West",
            year = 2003,
            bpm = 84,
            key = "1B",
            coOccurrenceScore = 92,
            genreCluster = "Soul Chopping",
            duration = "4:32",
            albumArtUrl = "https://assets.artistgrid.cx/webp/kanyewest.webp",
            youtubeVideoId = "uvb-1wjAtk4"
        ),
        ConnectedTrack(
            id = "tr-4",
            title = "Through the Fire",
            artist = "Chaka Khan",
            year = 1984,
            bpm = 84,
            key = "1B",
            coOccurrenceScore = 88,
            genreCluster = "Vintage Soul",
            duration = "4:47",
            albumArtUrl = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&auto=format&fit=crop&q=80",
            isOriginalSample = true,
            youtubeVideoId = "bZ_Vpydk2g8"
        ),
        ConnectedTrack(
            id = "tr-5",
            title = "One More Time",
            artist = "Daft Punk",
            year = 2000,
            bpm = 123,
            key = "11B",
            coOccurrenceScore = 85,
            genreCluster = "French House",
            duration = "5:20",
            albumArtUrl = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&auto=format&fit=crop&q=80",
            youtubeVideoId = "FGBhQbmPwH8"
        ),
        ConnectedTrack(
            id = "tr-6",
            title = "More Spell on You",
            artist = "Eddie Johns",
            year = 1979,
            bpm = 123,
            key = "11B",
            coOccurrenceScore = 82,
            genreCluster = "Filter Disco",
            duration = "3:30",
            albumArtUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80",
            isOriginalSample = true,
            youtubeVideoId = "bZ_Vpydk2g8"
        )
    )

    fun synthesize(
        consensusRatio: Float = 0.5f,
        harmonicFlow: Boolean = true
    ): SynthesizedPlaylist {
        val weightedTracks = candidateTracks.map { track ->
            val consensusVal = track.coOccurrenceScore.toFloat()
            val diversityVal = if (track.isOriginalSample) 100f else (100f - track.coOccurrenceScore * 0.3f)
            val blendedScore = (consensusVal * consensusRatio) + (diversityVal * (1f - consensusRatio))
            track.copy(blendedScore = blendedScore)
        }

        val sortedTracks = if (harmonicFlow) {
            weightedTracks.sortedWith(
                compareBy<ConnectedTrack> { CamelotWheel.getIndex(it.key) }
                    .thenBy { it.bpm }
            )
        } else {
            weightedTracks.sortedByDescending { it.blendedScore }
        }

        val youtubeVideoIds = sortedTracks.mapNotNull { it.youtubeVideoId.takeIf { id -> id.isNotBlank() } }
        val youtubeUrl = if (youtubeVideoIds.isNotEmpty()) {
            "https://www.youtube.com/watch_videos?video_ids=${youtubeVideoIds.joinToString(",")}"
        } else {
            "https://www.youtube.com"
        }

        return SynthesizedPlaylist(
            sourcePlaylists = samplePoolPlaylists,
            tracks = sortedTracks,
            youtubeContinuousPlaylistUrl = youtubeUrl
        )
    }
}
