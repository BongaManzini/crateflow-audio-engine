package com.crateflow.app.data

import com.crateflow.app.model.AncestryNode
import com.crateflow.app.model.CommunityStats
import com.crateflow.app.model.SamplePair
import com.crateflow.app.model.Track
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class SampleRepository {

    private val initialSamples = listOf(
        SamplePair(
            id = "kendrick-grant-green",
            trackA = Track(
                title = "Sing About Me, I'm Dying of Thirst",
                artist = "Kendrick Lamar",
                year = 2012,
                album = "good kid, m.A.A.d city",
                albumArtUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
                genre = "Conscious Hip-Hop",
                bpm = 74,
                key = "8A",
                cueSeconds = 12.0f,
                durationSeconds = 360,
                sampleDescription = "Guitar arpeggio & delicate jazz drum break loop",
                youtubeId = "mIFAomeTBBM"
            ),
            trackB = Track(
                title = "Maybe Tomorrow",
                artist = "Grant Green",
                year = 1971,
                album = "Visions",
                albumArtUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
                genre = "Soul Jazz / Blue Note",
                bpm = 74,
                key = "8A",
                cueSeconds = 4.2f,
                durationSeconds = 295,
                sampleDescription = "Direct Master Flip & Guitar Chop",
                isOriginalSample = true,
                youtubeId = "T-iZF2LyxIs"
            ),
            ancestry = listOf(
                AncestryNode(0, "Sing About Me, I'm Dying of Thirst", "Kendrick Lamar", 2012, "Parent Track"),
                AncestryNode(1, "Maybe Tomorrow", "Grant Green", 1971, "Primary Guitar & Rhythm Sample"),
                AncestryNode(2, "Django", "Modern Jazz Quartet", 1954, "Harmonic Reference (Jazz Standard)")
            ),
            community = CommunityStats(
                verifiedBy = 84,
                isVerified = true,
                submissionsCount = 14,
                curatorNote = "Produced by Like of Pac Div. The vintage Blue Note guitar tone was time-stretched without pitch alteration to create the reflective heartbeat of the 12-minute opus."
            )
        ),
        SamplePair(
            id = "daft-punk-eddie-johns",
            trackA = Track(
                title = "One More Time",
                artist = "Daft Punk",
                year = 2000,
                album = "Discovery",
                albumArtUrl = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
                genre = "French House / Filter Disco",
                bpm = 123,
                key = "11B",
                cueSeconds = 0.0f,
                durationSeconds = 320,
                sampleDescription = "Micro-chopped celebratory brass fanfare & kick sync",
                youtubeId = "FGBhQbmPwH8"
            ),
            trackB = Track(
                title = "More Spell on You",
                artist = "Eddie Johns",
                year = 1979,
                album = "More Spell on You",
                albumArtUrl = "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80",
                genre = "Euro Disco / Funk",
                bpm = 123,
                key = "11B",
                cueSeconds = 36.4f,
                durationSeconds = 215,
                sampleDescription = "Micro-Chop & Re-Sequenced Brass Stabs",
                isOriginalSample = true,
                youtubeId = "gVfB6UqN0YQ"
            ),
            ancestry = listOf(
                AncestryNode(0, "One More Time", "Daft Punk", 2000, "Filter House Anthem"),
                AncestryNode(1, "More Spell on You", "Eddie Johns", 1979, "Brass & Horn Micro-Chops")
            ),
            community = CommunityStats(
                verifiedBy = 142,
                isVerified = true,
                submissionsCount = 29,
                curatorNote = "Thomas Bangalter sliced 0.25-second horn fragments from Eddie Johns, reversed subtle envelope tails, and re-arranged them into an entirely new melodic hook."
            )
        ),
        SamplePair(
            id = "kanye-chaka",
            trackA = Track(
                title = "Through the Wire",
                artist = "Kanye West",
                year = 2003,
                album = "The College Dropout",
                albumArtUrl = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
                genre = "Hip-Hop",
                bpm = 84,
                key = "1B",
                cueSeconds = 0.0f,
                durationSeconds = 221,
                sampleDescription = "Speed-up Soul Pitch Shift & Chop",
                youtubeId = "uvb-1wjAtk4"
            ),
            trackB = Track(
                title = "Through the Fire",
                artist = "Chaka Khan",
                year = 1984,
                album = "I Feel for You",
                albumArtUrl = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80",
                genre = "R&B / Soul",
                bpm = 84,
                key = "1B",
                cueSeconds = 199.0f,
                durationSeconds = 286,
                sampleDescription = "Direct Master Vocal & Horn Sample",
                isOriginalSample = true,
                youtubeId = "bZ_Vpydk2g8"
            ),
            ancestry = listOf(
                AncestryNode(0, "Through the Wire", "Kanye West", 2003, "Parent Track"),
                AncestryNode(1, "Through the Fire", "Chaka Khan", 1984, "Sample Source")
            ),
            community = CommunityStats(210, true, 28, "Chaka Khan vocal pitched up +5 semitones.")
        ),
        SamplePair(
            id = "mfdoom-sade",
            trackA = Track(
                title = "Doomsday",
                artist = "MF DOOM ft. Pebbles",
                year = 1999,
                album = "Operation: Doomsday",
                albumArtUrl = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
                genre = "Underground Hip-Hop",
                bpm = 92,
                key = "4A",
                cueSeconds = 15.2f,
                durationSeconds = 298,
                sampleDescription = "Lush electric piano chords & vocal melody interpolation",
                youtubeId = "gQbHGOJyP1Y"
            ),
            trackB = Track(
                title = "Kiss of Love",
                artist = "Sade",
                year = 1992,
                album = "Love Deluxe",
                albumArtUrl = "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80",
                genre = "Smooth Soul / Quiet Storm",
                bpm = 92,
                key = "4A",
                cueSeconds = 0.0f,
                durationSeconds = 254,
                sampleDescription = "Harmonic Interpolation & Rhyme Foundation",
                isOriginalSample = true,
                youtubeId = "Bv_4L6kH5v4"
            ),
            ancestry = listOf(
                AncestryNode(0, "Doomsday", "MF DOOM", 1999, "Underground Classic"),
                AncestryNode(1, "Kiss of Love", "Sade", 1992, "Melodic & Vocal Foundation")
            ),
            community = CommunityStats(
                verifiedBy = 96,
                isVerified = true,
                submissionsCount = 19,
                curatorNote = "DOOM flipped the opening chords of Sade's 'Kiss of Love' and had Pebbles sing Sade's exact vocal cadence over dusty boom-bap drums."
            )
        )
    )

    private val _samples = MutableStateFlow(initialSamples)
    val samples: StateFlow<List<SamplePair>> = _samples.asStateFlow()

    fun addSample(newPair: SamplePair) {
        _samples.value = listOf(newPair) + _samples.value
    }

    fun upvoteSample(id: String) {
        _samples.value = _samples.value.map { pair ->
            if (pair.id == id) {
                pair.copy(community = pair.community.copy(verifiedBy = pair.community.verifiedBy + 1))
            } else {
                pair
            }
        }
    }
}
