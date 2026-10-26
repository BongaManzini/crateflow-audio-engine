package com.crateflow.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Switch
import androidx.compose.material3.SwitchDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.crateflow.app.model.ConnectedTrack
import com.crateflow.app.model.SynthesizedPlaylist
import com.crateflow.app.ui.theme.AccentGreen
import com.crateflow.app.ui.theme.AccentPurple
import com.crateflow.app.ui.theme.AmberDeck
import com.crateflow.app.ui.theme.SkyDeck
import com.crateflow.app.ui.theme.SurfaceBorder
import com.crateflow.app.ui.theme.SurfaceCard
import com.crateflow.app.ui.theme.TextMuted
import com.crateflow.app.ui.theme.TextPrimary

@Composable
fun PlaylistSection(
    playlist: SynthesizedPlaylist,
    consensusRatio: Float,
    onConsensusChange: (Float) -> Unit,
    harmonicFlow: Boolean,
    onHarmonicToggle: () -> Unit,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(SurfaceCard, RoundedCornerShape(20.dp))
            .border(1.dp, SurfaceBorder, RoundedCornerShape(20.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Section Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Multi-Playlist Synthesizer",
                    color = TextPrimary,
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
                Text(
                    text = "Mining ${playlist.sourcePlaylists.size} public streaming playlists",
                    color = TextMuted,
                    fontSize = 11.sp
                )
            }

            TagPill(text = "Graph Engine", color = AccentGreen)
        }

        // Consensus vs Culture Bridge Slider
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color(0xFF090A0F), RoundedCornerShape(14.dp))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(14.dp))
                .padding(10.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "Culture Bridge",
                    color = if (consensusRatio < 0.4f) AmberDeck else TextMuted,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
                Text(
                    text = "Consensus (Overlap)",
                    color = if (consensusRatio > 0.6f) AccentGreen else TextMuted,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
            }

            Slider(
                value = consensusRatio,
                onValueChange = onConsensusChange,
                modifier = Modifier.fillMaxWidth(),
                colors = SliderDefaults.colors(
                    thumbColor = AmberDeck,
                    activeTrackColor = AmberDeck,
                    inactiveTrackColor = AccentGreen.copy(alpha = 0.5f)
                )
            )

            // Harmonic Camelot Flow Toggle
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text(
                        text = "Harmonic Camelot Flow",
                        color = TextPrimary,
                        fontSize = 12.sp,
                        fontWeight = FontWeight.SemiBold
                    )
                    Text(
                        text = "Orders by key & progressive tempo",
                        color = TextMuted,
                        fontSize = 10.sp
                    )
                }

                Switch(
                    checked = harmonicFlow,
                    onCheckedChange = { onHarmonicToggle() },
                    colors = SwitchDefaults.colors(
                        checkedThumbColor = Color.White,
                        checkedTrackColor = AccentPurple
                    )
                )
            }
        }

        // Sequenced Tracks
        Text(
            text = "${playlist.tracks.size} Sequenced Tracks",
            color = TextMuted,
            fontSize = 11.sp,
            fontWeight = FontWeight.SemiBold
        )

        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            playlist.tracks.forEachIndexed { index, track ->
                TrackRowItem(index = index + 1, track = track)
            }
        }
    }
}

@Composable
private fun TrackRowItem(index: Int, track: ConnectedTrack) {
    val bgColor = if (track.isOriginalSample) SkyDeck.copy(alpha = 0.08f) else Color(0xFF0D0E14)
    val borderColor = if (track.isOriginalSample) SkyDeck.copy(alpha = 0.3f) else SurfaceBorder

    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(bgColor, RoundedCornerShape(12.dp))
            .border(1.dp, borderColor, RoundedCornerShape(12.dp))
            .padding(8.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "$index",
            color = TextMuted,
            fontSize = 11.sp,
            modifier = Modifier.width(22.dp)
        )

        AsyncImage(
            model = track.albumArtUrl,
            contentDescription = track.title,
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .size(36.dp)
                .clip(RoundedCornerShape(8.dp))
        )

        Spacer(modifier = Modifier.width(10.dp))

        Column(modifier = Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = track.title,
                    color = TextPrimary,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                if (track.isOriginalSample) {
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = "ORIGINAL",
                        color = SkyDeck,
                        fontSize = 8.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
            Text(
                text = "${track.artist} • ${track.year}",
                color = TextMuted,
                fontSize = 10.sp,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            TagPill(text = track.key, color = AccentPurple)
            Text(
                text = "${track.bpm} BPM",
                color = TextMuted,
                fontSize = 10.sp
            )
        }
    }
}
