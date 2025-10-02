package com.example.foodrescuemobile.data.network

import com.example.foodrescuemobile.data.network.models.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>

    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>

    @GET("food-posts")
    suspend fun getFoodPosts(@Header("Authorization") token: String): Response<List<FoodPostResponse>>

    @POST("food-posts")
    suspend fun createFoodPost(
        @Header("Authorization") token: String,
        @Body request: FoodPostRequest
    ): Response<FoodPostResponse>

    @POST("food-posts/{id}/claim")
    suspend fun claimFood(
        @Header("Authorization") token: String,
        @Path("id") postId: String,
        @Body request: ClaimRequest
    ): Response<ClaimResponse>

    @GET("users/me")
    suspend fun getProfile(@Header("Authorization") token: String): Response<UserResponse>
}

data class FoodPostResponse(
    val id: String,
    val userId: String,
    val title: String,
    val description: String,
    val imageUrl: String?,
    val location: LocationResponse,
    val pickupAddress: String,
    val expiry: String,
    val status: String,
    val createdAt: String
)

data class LocationResponse(
    val lat: Double,
    val lng: Double
)

data class ClaimResponse(
    val id: String,
    val foodPostId: String,
    val claimedBy: String,
    val status: String,
    val pickupTime: String,
    val createdAt: String
)