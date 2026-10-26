package com.crateflow.app.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.crateflow.app.ui.theme.SurfaceBorder
import kotlin.math.sin

@Composable
fun WaveformBar(
    cueSeconds: Float,
    barColor: Color,
    isActive: Boolean,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(48.dp)
            .background(Color(0xFF07070A), RoundedCornerShape(12.dp))
            .border(1.dp, SurfaceBorder, RoundedCornerShape(12.dp))
            .padding(4.dp)
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val barCount = 36
            val barWidth = (size.width / barCount) - 2f

            for (i in 0 until barCount) {
                val wave = (sin(i * 0.3) * 0.5 + 0.5).toFloat()
                val barHeight = 8f + wave * (size.height * 0.7f)
                val x = i * (barWidth + 2f)
                val y = (size.height - barHeight) / 2f

                drawRoundRect(
                    color = if (isActive) barColor else Color(0xFF27272A),
                    topLeft = Offset(x, y),
                    size = Size(barWidth, barHeight),
                    cornerRadius = CornerRadius(2f, 2f)
                )
            }
        }

        Text(
            text = "Cue: ${cueSeconds}s",
            color = Color(0xFFA1A1AA),
            fontSize = 9.sp,
            modifier = Modifier
                .align(Alignment.TopEnd)
                .padding(end = 4.dp, top = 2.dp)
        )
    }
}
