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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import com.crateflow.app.model.AncestryNode
import com.crateflow.app.model.CommunityStats
import com.crateflow.app.model.SamplePair
import com.crateflow.app.model.Track
import com.crateflow.app.ui.theme.AmberDeck
import com.crateflow.app.ui.theme.SkyDeck
import com.crateflow.app.ui.theme.SurfaceBorder
import com.crateflow.app.ui.theme.SurfaceCard
import com.crateflow.app.ui.theme.TextMuted
import com.crateflow.app.ui.theme.TextPrimary

@Composable
fun SubmitSampleDialog(
    onDismiss: () -> Unit,
    onSubmit: (SamplePair) -> Unit
) {
    var titleA by remember { mutableStateOf("") }
    var artistA by remember { mutableStateOf("") }
    var cueA by remember { mutableStateOf("12.0") }

    var titleB by remember { mutableStateOf("") }
    var artistB by remember { mutableStateOf("") }
    var cueB by remember { mutableStateOf("4.0") }

    Dialog(onDismissRequest = onDismiss) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(SurfaceCard, RoundedCornerShape(20.dp))
                .border(1.dp, SurfaceBorder, RoundedCornerShape(20.dp))
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Text(
                text = "Contribute Sample Lineage",
                color = TextPrimary,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "Crowdsource uncredited sample cue timestamps",
                color = TextMuted,
                fontSize = 11.sp
            )

            // Track A
            Text(text = "Track A (Modern Song)", color = AmberDeck, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            OutlinedTextField(
                value = titleA,
                onValueChange = { titleA = it },
                label = { Text("Song Title") },
                modifier = Modifier.fillMaxWidth(),
                colors = customFieldColors()
            )
            OutlinedTextField(
                value = artistA,
                onValueChange = { artistA = it },
                label = { Text("Artist") },
                modifier = Modifier.fillMaxWidth(),
                colors = customFieldColors()
            )

            Spacer(modifier = Modifier.height(4.dp))

            // Track B
            Text(text = "Track B (Original Sample Source)", color = SkyDeck, fontSize = 11.sp, fontWeight = FontWeight.Bold)
            OutlinedTextField(
                value = titleB,
                onValueChange = { titleB = it },
                label = { Text("Source Title") },
                modifier = Modifier.fillMaxWidth(),
                colors = customFieldColors()
            )
            OutlinedTextField(
                value = artistB,
                onValueChange = { artistB = it },
                label = { Text("Source Artist") },
                modifier = Modifier.fillMaxWidth(),
                colors = customFieldColors()
            )

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                TextButton(onClick = onDismiss) {
                    Text(text = "Cancel", color = TextMuted)
                }
                Button(
                    onClick = {
                        if (titleA.isNotBlank() && titleB.isNotBlank()) {
                            val newPair = SamplePair(
                                id = "custom-${System.currentTimeMillis()}",
                                trackA = Track(
                                    title = titleA,
                                    artist = artistA,
                                    year = 2024,
                                    album = "Single",
                                    albumArtUrl = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
                                    genre = "Modern Release",
                                    bpm = 90,
                                    key = "8A",
                                    cueSeconds = cueA.toFloatOrNull() ?: 12f,
                                    durationSeconds = 240,
                                    sampleDescription = "Community submitted sample flip"
                                ),
                                trackB = Track(
                                    title = titleB,
                                    artist = artistB,
                                    year = 1978,
                                    album = "Archive",
                                    albumArtUrl = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
                                    genre = "Vintage Master",
                                    bpm = 90,
                                    key = "8A",
                                    cueSeconds = cueB.toFloatOrNull() ?: 4f,
                                    durationSeconds = 210,
                                    sampleDescription = "Direct Master Flip",
                                    isOriginalSample = true
                                ),
                                ancestry = listOf(
                                    AncestryNode(0, titleA, artistA, 2024, "Parent Track"),
                                    AncestryNode(1, titleB, artistB, 1978, "Sample Source")
                                ),
                                community = CommunityStats(1, false, 1, "Community submission")
                            )
                            onSubmit(newPair)
                            onDismiss()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = AmberDeck, contentColor = Color.Black)
                ) {
                    Text(text = "Submit Flip", fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
private fun customFieldColors() = OutlinedTextFieldDefaults.colors(
    focusedBorderColor = AmberDeck,
    unfocusedBorderColor = SurfaceBorder,
    focusedTextColor = TextPrimary,
    unfocusedTextColor = TextPrimary
)
