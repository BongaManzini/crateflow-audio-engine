package com.crateflow.app.data

import com.crateflow.app.model.SamplePair
import com.crateflow.app.model.Track
import com.crateflow.app.model.AncestryNode
import com.crateflow.app.model.CommunityStats

data class ArtistGridItem(
    val name: String,
    val genre: String,
    val imageUrl: String,
    val trackerUrl: String,
    val liveTrackerUrl: String = "https://artistgrid.cx/",
    val artistGridUrl: String = "https://artistgrid.cx/",
    val credit: String,
    val isBest: Boolean,
    val samplesCount: Int,
    val featuredSample: SamplePair
)

object ArtistGridCatalog {
    val artists = listOf(
        ArtistGridItem(
            name = "Kanye West",
            genre = "Hip-Hop / Soul Chopping",
            imageUrl = "https://assets.artistgrid.cx/webp/kanyewest.webp",
            trackerUrl = "12nGHPPh5dVTfLuBLVQYzC3QgPxKfvp-jgCoNccvEasM",
            liveTrackerUrl = "https://docs.google.com/spreadsheets/d/12nGHPPh5dVTfLuBLVQYzC3QgPxKfvp-jgCoNccvEasM",
            credit = "Nicole, Edideaur",
            isBest = true,
            samplesCount = 412,
            featuredSample = SamplePair(
                id = "kanye-chaka",
                trackA = Track(
                    title = "Through the Wire",
                    artist = "Kanye West",
                    year = 2003,
                    album = "The College Dropout",
                    albumArtUrl = "https://assets.artistgrid.cx/webp/kanyewest.webp",
                    genre = "Hip-Hop",
                    bpm = 84,
                    key = "1B",
                    cueSeconds = 0.0f,
                    durationSeconds = 221,
                    sampleDescription = "Speed-up Soul Pitch Shift & Chop"
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
                    isOriginalSample = true
                ),
                ancestry = listOf(
                    AncestryNode(0, "Through the Wire", "Kanye West", 2003, "Parent Track"),
                    AncestryNode(1, "Through the Fire", "Chaka Khan", 1984, "Sample Source")
                ),
                community = CommunityStats(98, true, 0.0f, 18, "From verified Kanye West community tracker sheet.")
            )
        ),
        ArtistGridItem(
            name = "Playboi Carti",
            genre = "Trap / Rage / Opium",
            imageUrl = "https://assets.artistgrid.cx/webp/playboicarti.webp",
            trackerUrl = "1ivoRJskby8zykhH_szifY4a1HIQCTnVh6c2WfIfMbkM",
            liveTrackerUrl = "https://docs.google.com/spreadsheets/d/1ivoRJskby8zykhH_szifY4a1HIQCTnVh6c2WfIfMbkM",
            credit = "Playboi Balint, realgangshit, Aztek Silver",
            isBest = false,
            samplesCount = 110,
            featuredSample = SamplePair(
                id = "carti-kraftwerk",
                trackA = Track(
                    title = "Location",
                    artist = "Playboi Carti",
                    year = 2017,
                    album = "Playboi Carti",
                    albumArtUrl = "https://assets.artistgrid.cx/webp/playboicarti.webp",
                    genre = "Trap",
                    bpm = 82,
                    key = "2A",
                    cueSeconds = 0.0f,
                    durationSeconds = 168,
                    sampleDescription = "Atmospheric Synth Interpolation by Pi'erre Bourne"
                ),
                trackB = Track(
                    title = "Trans-Europe Express",
                    artist = "Kraftwerk",
                    year = 1977,
                    album = "Trans-Europe Express",
                    albumArtUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
                    genre = "Krautrock",
                    bpm = 82,
                    key = "2A",
                    cueSeconds = 14.0f,
                    durationSeconds = 400,
                    sampleDescription = "Synthesizer Lead Theme",
                    isOriginalSample = true
                ),
                ancestry = listOf(
                    AncestryNode(0, "Location", "Playboi Carti", 2017, "Parent Track"),
                    AncestryNode(1, "Trans-Europe Express", "Kraftwerk", 1977, "Sample Source")
                ),
                community = CommunityStats(76, true, 0.0f, 9, "Pi'erre Bourne resampled synth line.")
            )
        ),
        ArtistGridItem(
            name = "Kendrick Lamar",
            genre = "Conscious Hip-Hop / Jazz Rap",
            imageUrl = "https://assets.artistgrid.cx/webp/kendricklamar.webp",
            trackerUrl = "1i4OQglDHiiqMDthqfUFPutGmpZzK7n63LaoWApqhQXI",
            liveTrackerUrl = "https://docs.google.com/spreadsheets/d/1i4OQglDHiiqMDthqfUFPutGmpZzK7n63LaoWApqhQXI",
            credit = "Infisrael, aeolowl, hunnnter, sixsensenella",
            isBest = false,
            samplesCount = 168,
            featuredSample = SamplePair(
                id = "kendrick-grant-green",
                trackA = Track(
                    title = "Sing About Me, I'm Dying of Thirst",
                    artist = "Kendrick Lamar",
                    year = 2012,
                    album = "good kid, m.A.A.d city",
                    albumArtUrl = "https://assets.artistgrid.cx/webp/kendricklamar.webp",
                    genre = "Conscious Hip-Hop",
                    bpm = 74,
                    key = "8A",
                    cueSeconds = 0.0f,
                    durationSeconds = 360,
                    sampleDescription = "Direct Master Flip & Guitar Chop"
                ),
                trackB = Track(
                    title = "Maybe Tomorrow",
                    artist = "Grant Green",
                    year = 1971,
                    album = "Visions",
                    albumArtUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
                    genre = "Soul Jazz",
                    bpm = 74,
                    key = "8A",
                    cueSeconds = 4.2f,
                    durationSeconds = 295,
                    sampleDescription = "Guitar Arpeggio & Jazz Rhythm Break",
                    isOriginalSample = true
                ),
                ancestry = listOf(
                    AncestryNode(0, "Sing About Me", "Kendrick Lamar", 2012, "Parent Track"),
                    AncestryNode(1, "Maybe Tomorrow", "Grant Green", 1971, "Sample Source")
                ),
                community = CommunityStats(84, true, 0.0f, 14, "Produced by Like of Pac Div.")
            )
        ),
        ArtistGridItem(
            name = "Frank Ocean",
            genre = "R&B / Experimental Pop",
            imageUrl = "https://assets.artistgrid.cx/webp/frankocean.webp",
            trackerUrl = "franktracker.net",
            liveTrackerUrl = "https://franktracker.net",
            credit = "Infishere, Edideaur",
            isBest = true,
            samplesCount = 74,
            featuredSample = SamplePair(
                id = "frank-stevie",
                trackA = Track(
                    title = "Close to You",
                    artist = "Frank Ocean",
                    year = 2016,
                    album = "Blonde",
                    albumArtUrl = "https://assets.artistgrid.cx/webp/frankocean.webp",
                    genre = "R&B",
                    bpm = 68,
                    key = "11B",
                    cueSeconds = 0.0f,
                    durationSeconds = 85,
                    sampleDescription = "Talkbox Vocal Resampling"
                ),
                trackB = Track(
                    title = "Never Can Say Goodbye",
                    artist = "Stevie Wonder",
                    year = 1972,
                    album = "Live Talkbox",
                    albumArtUrl = "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80",
                    genre = "Soul",
                    bpm = 68,
                    key = "11B",
                    cueSeconds = 12.0f,
                    durationSeconds = 210,
                    sampleDescription = "Original Live Prism Talkbox",
                    isOriginalSample = true
                ),
                ancestry = listOf(
                    AncestryNode(0, "Close to You", "Frank Ocean", 2016, "Parent Track"),
                    AncestryNode(1, "Never Can Say Goodbye", "Stevie Wonder", 1972, "Sample Source")
                ),
                community = CommunityStats(92, true, 0.0f, 11, "Live TV performance vocal snippet.")
            )
        )
    )
}
