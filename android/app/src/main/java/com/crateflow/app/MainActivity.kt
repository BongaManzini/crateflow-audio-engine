package com.crateflow.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import com.crateflow.app.ui.CrateFlowScreen
import com.crateflow.app.ui.theme.CrateFlowTheme
import com.crateflow.app.viewmodel.CrateFlowViewModel

class MainActivity : ComponentActivity() {

    private val viewModel: CrateFlowViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CrateFlowTheme {
                CrateFlowScreen(viewModel = viewModel)
            }
        }
    }
}
