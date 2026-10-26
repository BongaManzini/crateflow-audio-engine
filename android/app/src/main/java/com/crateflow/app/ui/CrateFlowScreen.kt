package com.crateflow.app.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.crateflow.app.ui.components.AncestryTreeView
import com.crateflow.app.ui.components.ArtistGridExplorer
import com.crateflow.app.ui.components.CrossfaderControls
import com.crateflow.app.ui.components.DualDeckView
import com.crateflow.app.ui.components.PlaylistSection
import com.crateflow.app.ui.components.SubmitSampleDialog
import com.crateflow.app.ui.theme.AccentGreen
import com.crateflow.app.ui.theme.AmberDeck
import com.crateflow.app.ui.theme.BgMain
import com.crateflow.app.ui.theme.SurfaceBorder
import com.crateflow.app.ui.theme.SurfaceCard
import com.crateflow.app.ui.theme.TextMuted
import com.crateflow.app.ui.theme.TextPrimary
import com.crateflow.app.viewmodel.CrateFlowViewModel

@Composable
fun CrateFlowScreen(
    viewModel: CrateFlowViewModel,
    modifier: Modifier = Modifier
) {
    val uiState by viewModel.uiState.collectAsState()
    var showSubmitDialog by remember { mutableStateOf(false) }
    var selectedTab by remember { mutableStateOf("decks") } // "decks" | "artistgrid" | "playlist" | "ancestry"

    val tabs = listOf(
        Pair("decks", "🎧 Decks"),
        Pair("artistgrid", "🌐 ArtistGrid (500+)"),
        Pair("playlist", "🎛️ Playlists"),
        Pair("ancestry", "🌳 Ancestry")
    )

    Scaffold(
        modifier = modifier.fillMaxSize(),
        containerColor = BgMain,
        topBar = {
            TopAppBarCustom(
                onOpenSubmit = { showSubmitDialog = true }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = 16.dp)
                .verticalScroll(rememberScrollState()),
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            Spacer(modifier = Modifier.height(4.dp))

            // Navigation Tabs
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFF101117), RoundedCornerShape(14.dp))
                    .padding(4.dp)
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                tabs.forEach { (tabId, tabLabel) ->
                    val isSelected = selectedTab == tabId
                    Button(
                        onClick = { selectedTab = tabId },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (isSelected) AmberDeck else Color.Transparent,
                            contentColor = if (isSelected) Color.Black else TextMuted
                        ),
                        shape = RoundedCornerShape(10.dp),
                        contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 10.dp, vertical = 6.dp),
                        modifier = Modifier.height(34.dp)
                    ) {
                        Text(
                            text = tabLabel,
                            fontSize = 11.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
                        )
                    }
                }
            }

            // Quick Ambient Listen Bar
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Button(
                    onClick = { viewModel.startAmbientListen() },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (uiState.isListening) Color(0xFFE11D48) else SurfaceCard,
                        contentColor = if (uiState.isListening) Color.White else AmberDeck
                    ),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.Mic,
                        contentDescription = "Ambient Listen",
                        modifier = Modifier.size(16.dp)
                    )
                    Spacer(modifier = Modifier.width(4.dp))
                    Text(
                        text = if (uiState.isListening) "Listening..." else "Shazam",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }

                Row(
                    modifier = Modifier
                        .weight(1f)
                        .horizontalScroll(rememberScrollState()),
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    uiState.allPairs.forEach { pair ->
                        val isSelected = pair.id == uiState.activePair.id
                        Button(
                            onClick = {
                                viewModel.selectPair(pair)
                                selectedTab = "decks"
                            },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (isSelected) AmberDeck.copy(alpha = 0.2f) else SurfaceCard,
                                contentColor = if (isSelected) AmberDeck else TextMuted
                            ),
                            shape = RoundedCornerShape(10.dp),
                            contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 8.dp, vertical = 4.dp),
                            modifier = Modifier.height(34.dp)
                        ) {
                            Text(
                                text = "${pair.trackA.artist} ⇄ ${pair.trackB.artist}",
                                fontSize = 10.sp,
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                            )
                        }
                    }
                }
            }

            // Tab 1: Decks & Mixer
            if (selectedTab == "decks") {
                DualDeckView(
                    activePair = uiState.activePair,
                    crossfade = uiState.crossfade
                )

                CrossfaderControls(
                    isPlaying = uiState.isPlaying,
                    onTogglePlay = { viewModel.togglePlay() },
                    crossfade = uiState.crossfade,
                    onCrossfadeChange = { viewModel.setCrossfade(it) },
                    isTransitioning = uiState.isTransitioning,
                    transitionStage = uiState.transitionStage,
                    transitionProgress = uiState.transitionProgress,
                    nudgeOffset = uiState.nudgeOffset,
                    onNudge = { viewModel.nudge(it) },
                    onVote = { viewModel.upvoteCurrent() },
                    verifiedCount = uiState.activePair.community.verifiedBy,
                    onAutoTransition = { viewModel.startAutoTransition() }
                )
            }

            // Tab 2: ArtistGrid Catalog (500+ Artists)
            if (selectedTab == "artistgrid") {
                ArtistGridExplorer(
                    onSelectSample = { samplePair ->
                        viewModel.addSample(samplePair)
                        selectedTab = "decks"
                    }
                )
            }

            // Tab 3: Playlists
            if (selectedTab == "playlist") {
                PlaylistSection(
                    playlist = uiState.synthesizedPlaylist,
                    consensusRatio = uiState.consensusRatio,
                    onConsensusChange = { viewModel.setConsensusRatio(it) },
                    harmonicFlow = uiState.harmonicFlow,
                    onHarmonicToggle = { viewModel.toggleHarmonicFlow() }
                )
            }

            // Tab 4: Sample Ancestry
            if (selectedTab == "ancestry") {
                AncestryTreeView(
                    activePair = uiState.activePair
                )
            }

            Spacer(modifier = Modifier.height(20.dp))
        }

        if (showSubmitDialog) {
            SubmitSampleDialog(
                onDismiss = { showSubmitDialog = false },
                onSubmit = { newPair -> viewModel.addSample(newPair) }
            )
        }
    }
}

@Composable
private fun TopAppBarCustom(onOpenSubmit: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(BgMain)
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Crate",
                    color = TextPrimary,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.ExtraBold
                )
                Text(
                    text = "Flow",
                    color = AmberDeck,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.ExtraBold
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "WHOSAMPLED × ARTISTGRID",
                    color = AccentGreen,
                    fontSize = 9.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Text(
                text = "Sample Lineage, DSP DJ Transitions & ArtistGrid Catalog",
                color = TextMuted,
                fontSize = 10.sp
            )
        }

        IconButton(
            onClick = onOpenSubmit,
            modifier = Modifier
                .size(36.dp)
                .background(SurfaceCard, RoundedCornerShape(10.dp))
        ) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Contribute",
                tint = AmberDeck
            )
        }
    }
}
