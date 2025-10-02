package com.example.foodrescuemobile.data.repository


import com.example.foodrescuemobile.data.FoodPost
import com.example.foodrescuemobile.data.Location
import com.example.foodrescuemobile.data.User
import com.example.foodrescuemobile.data.network.ApiService
import com.example.foodrescuemobile.data.network.models.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class FoodRescueRepository(private val apiService: ApiService) {

    suspend fun login(email: String, password: String): Result<AuthResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.login(LoginRequest(email, password))
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception(response.message() ?: "Login failed"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }

    suspend fun register(
        name: String,
        email: String,
        password: String,
        role: String,
        phone: String?
    ): Result<AuthResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.register(
                    RegisterRequest(name, email, password, role, phone)
                )
                if (response.isSuccessful && response.body() != null) {
                    Result.success(response.body()!!)
                } else {
                    Result.failure(Exception(response.message() ?: "Registration failed"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }

    suspend fun getFoodPosts(token: String): Result<List<FoodPost>> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getFoodPosts("Bearer $token")
                if (response.isSuccessful && response.body() != null) {
                    val foodPosts = response.body()!!.map { apiFoodPost ->
                        FoodPost(
                            id = apiFoodPost.id,
                            userId = apiFoodPost.userId,
                            title = apiFoodPost.title,
                            description = apiFoodPost.description,
                            imageUrl = apiFoodPost.imageUrl,
                            location = Location(
                                latitude = apiFoodPost.location.lat,
                                longitude = apiFoodPost.location.lng
                            ),
                            pickupAddress = apiFoodPost.pickupAddress,
                            expiry = apiFoodPost.expiry,
                            status = apiFoodPost.status
                        )
                    }
                    Result.success(foodPosts)
                } else {
                    Result.failure(Exception(response.message() ?: "Failed to fetch food posts"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }

    suspend fun createFoodPost(
        token: String,
        title: String,
        description: String,
        imageUrl: String?,
        location: Location,
        pickupAddress: String,
        expiry: String
    ): Result<FoodPost> {
        return withContext(Dispatchers.IO) {
            try {
                val request = FoodPostRequest(
                    title = title,
                    description = description,
                    imageUrl = imageUrl,
                    location = LocationRequest(location.latitude, location.longitude),
                    pickupAddress = pickupAddress,
                    expiry = expiry
                )

                val response = apiService.createFoodPost("Bearer $token", request)
                if (response.isSuccessful && response.body() != null) {
                    val apiFoodPost = response.body()!!
                    val foodPost = FoodPost(
                        id = apiFoodPost.id,
                        userId = apiFoodPost.userId,
                        title = apiFoodPost.title,
                        description = apiFoodPost.description,
                        imageUrl = apiFoodPost.imageUrl,
                        location = Location(
                            latitude = apiFoodPost.location.lat,
                            longitude = apiFoodPost.location.lng
                        ),
                        pickupAddress = apiFoodPost.pickupAddress,
                        expiry = apiFoodPost.expiry,
                        status = apiFoodPost.status
                    )
                    Result.success(foodPost)
                } else {
                    Result.failure(Exception(response.message() ?: "Failed to create food post"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }

    suspend fun getProfile(token: String): Result<User> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getProfile("Bearer $token")
                if (response.isSuccessful && response.body() != null) {
                    val apiUser = response.body()!!
                    val user = User(
                        id = apiUser.id,
                        name = apiUser.name,
                        email = apiUser.email,
                        role = apiUser.role,
                        phone = apiUser.phone
                    )
                    Result.success(user)
                } else {
                    Result.failure(Exception(response.message() ?: "Failed to fetch profile"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
    }
}