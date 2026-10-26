package com.crateflow.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = AmberDeck,
    secondary = SkyDeck,
    background = BgMain,
    surface = SurfaceCard,
    onPrimary = BgMain,
    onSecondary = BgMain,
    onBackground = TextPrimary,
    onSurface = TextPrimary
)

@Composable
fun CrateFlowTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        content = content
    )
}
