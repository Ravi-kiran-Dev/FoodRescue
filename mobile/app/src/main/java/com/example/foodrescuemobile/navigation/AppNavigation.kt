package com.example.foodrescuemobile.navigation

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.foodrescuemobile.ui.theme.screens.*
import com.example.foodrescuemobile.ui.theme.viewmodel.AuthViewModel
import com.example.foodrescuemobile.ui.theme.viewmodel.SettingsViewModel

@Composable
fun AppNavigation(
    startDestination: String = "login",
    onLogout: () -> Unit
) {
    val navController = rememberNavController()
    val authViewModel: AuthViewModel = viewModel()
    val settingsViewModel: SettingsViewModel = viewModel()

    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        composable("login") {
            LoginScreen(navController = navController, authViewModel = authViewModel)
        }

        composable("register") {
            RegisterScreen(navController = navController)
        }

        composable("home") {
            HomeScreen(navController = navController, onLogout = onLogout)
        }

        composable("profile") {
            ProfileScreen(navController = navController)
        }

        composable("settings") {
            SettingsScreen(navController = navController, settingsViewModel = settingsViewModel)
        }

        composable("post_food") {
            PostFoodScreen(navController = navController)
        }
    }
}