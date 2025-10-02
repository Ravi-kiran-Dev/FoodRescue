package com.example.foodrescuemobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.foodrescuemobile.data.PreferencesRepository
import com.example.foodrescuemobile.navigation.AppNavigation
import com.example.foodrescuemobile.ui.theme.FoodRescueTheme
import com.example.foodrescuemobile.ui.theme.viewmodel.AuthViewModel
import com.example.foodrescuemobile.ui.theme.viewmodel.SettingsViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val preferencesRepository = PreferencesRepository(this)

        setContent {
            val settingsViewModel: SettingsViewModel = viewModel(
                factory = SettingsViewModelFactory(preferencesRepository)
            )

            val authViewModel: AuthViewModel = viewModel(
                factory = AuthViewModelFactory(preferencesRepository)
            )

            val darkTheme by settingsViewModel.darkTheme.collectAsState()
            val isLoggedIn by authViewModel.isLoggedIn.collectAsState()

            FoodRescueTheme(darkTheme = darkTheme) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation(
                        startDestination = "login",
                        onLogout = { authViewModel.logout() }
                    )
                }
            }
        }
    }
}