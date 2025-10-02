package com.example.foodrescuemobile.data

data class User(
    val id: String,
    val name: String,
    val email: String,
    val role: String, // donor, ngo, volunteer
    val phone: String?
)

data class FoodPost(
    val id: String,
    val userId: String,
    val title: String,
    val description: String,
    val imageUrl: String?,
    val location: Location,
    val pickupAddress: String,
    val expiry: String, // ISO date string
    val status: String // available, claimed, picked_up
)

data class Location(
    val latitude: Double,
    val longitude: Double
)

data class Claim(
    val id: String,
    val foodPostId: String,
    val claimedBy: String,
    val status: String, // pending, confirmed, completed
    val pickupTime: String
)