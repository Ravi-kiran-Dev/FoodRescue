package com.example.foodrescuemobile.ui.theme.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.foodrescuemobile.R
import com.example.foodrescuemobile.data.FoodPost
import com.example.foodrescuemobile.data.Location
import com.example.foodrescuemobile.ui.theme.components.FoodCard

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    navController: NavController,
    onLogout: () -> Unit
) {
    // Sample data - in real app, fetch from API
    val foodPosts = remember {
        listOf(
            FoodPost(
                id = "1",
                userId = "user1",
                title = "Fresh Vegetables",
                description = "Assorted fresh vegetables, still good for another 2 days",
                imageUrl = null,
                location = Location(40.7128, -74.0060),
                pickupAddress = "123 Main St, New York, NY",
                expiry = "2023-06-15T18:00:00Z",
                status = "available"
            ),
            FoodPost(
                id = "2",
                userId = "user2",
                title = "Bakery Items",
                description = "Fresh bread and pastries, baked this morning",
                imageUrl = null,
                location = Location(40.7589, -73.9851),
                pickupAddress = "456 Broadway, New York, NY",
                expiry = "2023-06-14T12:00:00Z",
                status = "claimed"
            )
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.app_name)) },
                actions = {
                    IconButton(onClick = { navController.navigate("profile") }) {
                        Icon(Icons.Default.AccountCircle, contentDescription = "Profile")
                    }
                    IconButton(onClick = { navController.navigate("settings") }) {
                        Icon(Icons.Default.Settings, contentDescription = "Settings")
                    }
                    IconButton(onClick = onLogout) {
                        Icon(Icons.Default.Logout, contentDescription = "Logout")
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(
                onClick = { navController.navigate("post_food") }
            ) {
                Icon(Icons.Default.Add, contentDescription = "Post Food")
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(8.dp)
        ) {
            items(foodPosts) { foodPost ->
                FoodCard(
                    foodPost = foodPost,
                    onClaimClick = {
                        // Handle claim action
                    }
                )
            }
        }
    }
}