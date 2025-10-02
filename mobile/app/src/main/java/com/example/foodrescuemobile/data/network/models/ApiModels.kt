package com.example.foodrescuemobile.data.network.models

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val name: String,
    val email: String,
    val password: String,
    val role: String,
    val phone: String?
)

data class AuthResponse(
    val user: UserResponse,
    val token: String
)

data class UserResponse(
    val id: String,
    val name: String,
    val email: String,
    val role: String,
    val phone: String?
)

data class FoodPostRequest(
    val title: String,
    val description: String,
    val imageUrl: String?,
    val location: LocationRequest,
    val pickupAddress: String,
    val expiry: String
)

data class LocationRequest(
    val lat: Double,
    val lng: Double
)

data class ClaimRequest(
    val pickupTime: String
)

data class ApiResponse<T>(
    val success: Boolean,
    val data: T?,
    val message: String?
)