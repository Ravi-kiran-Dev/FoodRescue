package com.example.foodrescuemobile.ui.theme.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.foodrescuemobile.data.FoodPost
import com.example.foodrescuemobile.data.repository.FoodRescueRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class HomeViewModel(private val repository: FoodRescueRepository) : ViewModel() {
    private val _foodPosts = MutableStateFlow<List<FoodPost>>(emptyList())
    val foodPosts: StateFlow<List<FoodPost>> = _foodPosts

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage

    fun loadFoodPosts(token: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null

            repository.getFoodPosts(token)
                .onSuccess { posts ->
                    _foodPosts.value = posts
                }
                .onFailure { exception ->
                    _errorMessage.value = exception.message
                }

            _isLoading.value = false
        }
    }
}