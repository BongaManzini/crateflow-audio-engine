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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Slider
import androidx.compose.material3.SliderDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.crateflow.app.ui.theme.AmberDeck
import com.crateflow.app.ui.theme.SkyDeck
import com.crateflow.app.ui.theme.SurfaceBorder
import com.crateflow.app.ui.theme.SurfaceCard
import com.crateflow.app.ui.theme.TextMuted
import com.crateflow.app.ui.theme.TextPrimary

@Composable
fun CrossfaderControls(
    isPlaying: Boolean,
    onTogglePlay: () -> Unit,
    crossfade: Float,
    onCrossfadeChange: (Float) -> Unit,
    isTransitioning: Boolean,
    transitionStage: String,
    transitionProgress: Float,
    nudgeOffset: Float,
    onNudge: (Float) -> Unit,
    onVote: () -> Unit,
    verifiedCount: Int,
    onAutoTransition: () -> Unit,
    modifier: Modifier = Modifier
) {
    val percentA = ((1f - crossfade) * 100).toInt()
    val percentB = (crossfade * 100).toInt()

    Column(
        modifier = modifier
            .fillMaxWidth()
            .background(SurfaceCard, RoundedCornerShape(20.dp))
            .border(1.dp, SurfaceBorder, RoundedCornerShape(20.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        // Top Action Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Master Play / Pause
            IconButton(
                onClick = onTogglePlay,
                modifier = Modifier
                    .size(44.dp)
                    .background(if (isPlaying) AmberDeck else Color(0xFF27272A), RoundedCornerShape(12.dp))
            ) {
                Icon(
                    imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = "Play/Pause",
                    tint = if (isPlaying) Color.Black else TextPrimary
                )
            }

            // Big Automated DJ Transition Button
            Button(
                onClick = onAutoTransition,
                enabled = !isTransitioning,
                colors = ButtonDefaults.buttonColors(
                    containerColor = AmberDeck,
                    contentColor = Color.Black
                ),
                shape = RoundedCornerShape(12.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.SwapHoriz,
                    contentDescription = null,
                    modifier = Modifier.size(16.dp)
                )
                Text(
                    text = if (isTransitioning) transitionStage else if (crossfade < 0.5f) "Auto-Drop to Sample" else "Auto-Return to Modern",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(start = 6.dp)
                )
            }

            // Nudge Buttons & Upvote
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                NudgeButton(label = "-0.1s") { onNudge(-0.1f) }
                Text(
                    text = "${nudgeOffset}s",
                    color = AmberDeck,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.SemiBold
                )
                NudgeButton(label = "+0.1s") { onNudge(0.1f) }
            }
        }

        // Active Transition Progress Bar
        if (isTransitioning) {
            LinearProgressIndicator(
                progress = { transitionProgress },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(4.dp),
                color = AmberDeck,
                trackColor = Color(0xFF18181B)
            )
        }

        Spacer(modifier = Modifier.height(2.dp))

        // Crossfader Labels
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "Deck A ($percentA%)",
                color = AmberDeck,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Tactile DJ Crossfader",
                color = TextMuted,
                fontSize = 10.sp
            )
            Text(
                text = "Deck B ($percentB%)",
                color = SkyDeck,
                fontSize = 11.sp,
                fontWeight = FontWeight.Bold
            )
        }

        // Tactile DJ Crossfader Slider
        Slider(
            value = crossfade,
            onValueChange = onCrossfadeChange,
            modifier = Modifier.fillMaxWidth(),
            colors = SliderDefaults.colors(
                thumbColor = AmberDeck,
                activeTrackColor = AmberDeck,
                inactiveTrackColor = SkyDeck.copy(alpha = 0.5f)
            )
        )
    }
}

@Composable
private fun NudgeButton(label: String, onClick: () -> Unit) {
    Button(
        onClick = onClick,
        colors = ButtonDefaults.buttonColors(
            containerColor = Color(0xFF18181B),
            contentColor = TextPrimary
        ),
        shape = RoundedCornerShape(8.dp),
        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 6.dp, vertical = 2.dp),
        modifier = Modifier.height(28.dp)
    ) {
        Text(text = label, fontSize = 10.sp)
    }
}
