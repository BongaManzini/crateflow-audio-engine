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
import com.crateflow.app.model.SamplePair
import com.crateflow.app.model.Track
import com.crateflow.app.ui.theme.AmberDeck
import com.crateflow.app.ui.theme.SkyDeck
import com.crateflow.app.ui.theme.SurfaceBorder
import com.crateflow.app.ui.theme.SurfaceCard
import com.crateflow.app.ui.theme.TextMuted
import com.crateflow.app.ui.theme.TextPrimary

@Composable
fun DualDeckView(
    activePair: SamplePair,
    crossfade: Float,
    modifier: Modifier = Modifier
) {
    val isDeckAActive = crossfade < 0.85f
    val isDeckBActive = crossfade > 0.15f

    Column(
        modifier = modifier.fillMaxWidth(),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        // Deck A: Modern Track
        SingleDeckCard(
            label = "DECK A • MODERN RELEASE",
            track = activePair.trackA,
            deckColor = AmberDeck,
            isActive = isDeckAActive,
            cueSeconds = activePair.trackA.cueSeconds
        )

        // Deck B: Original Sample
        SingleDeckCard(
            label = "DECK B • ORIGINAL SAMPLE",
            track = activePair.trackB,
            deckColor = SkyDeck,
            isActive = isDeckBActive,
            cueSeconds = activePair.trackB.cueSeconds
        )
    }
}

@Composable
private fun SingleDeckCard(
    label: String,
    track: Track,
    deckColor: Color,
    isActive: Boolean,
    cueSeconds: Float
) {
    val borderColor = if (isActive) deckColor.copy(alpha = 0.5f) else SurfaceBorder

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(SurfaceCard, RoundedCornerShape(20.dp))
            .border(1.dp, borderColor, RoundedCornerShape(20.dp))
            .padding(14.dp)
    ) {
        // Top Header Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .background(deckColor, RoundedCornerShape(4.dp))
                )
                Spacer(modifier = Modifier.width(6.dp))
                Text(
                    text = label,
                    color = deckColor,
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                TagPill(text = "${track.bpm} BPM", color = deckColor)
                TagPill(text = "Key: ${track.key}", color = Color.White)
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Artwork and Metadata
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            AsyncImage(
                model = track.albumArtUrl,
                contentDescription = track.title,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .size(54.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
            )

            Spacer(modifier = Modifier.width(12.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = track.title,
                    color = TextPrimary,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.Bold,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = track.artist,
                    color = deckColor,
                    fontSize = 13.sp,
                    fontWeight = FontWeight.Medium,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = "${track.album} (${track.year}) • ${track.genre}",
                    color = TextMuted,
                    fontSize = 11.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Waveform Visualizer
        WaveformBar(
            cueSeconds = cueSeconds,
            barColor = deckColor,
            isActive = isActive
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Sample Description Snippet
        Text(
            text = "♪ ${track.sampleDescription}",
            color = TextMuted,
            fontSize = 11.sp,
            maxLines = 1,
            overflow = TextOverflow.Ellipsis
        )
    }
}

@Composable
fun TagPill(text: String, color: Color) {
    Text(
        text = text,
        color = color,
        fontSize = 10.sp,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier
            .background(color.copy(alpha = 0.12f), RoundedCornerShape(6.dp))
            .border(1.dp, color.copy(alpha = 0.25f), RoundedCornerShape(6.dp))
            .padding(horizontal = 6.dp, vertical = 2.dp)
    )
}
