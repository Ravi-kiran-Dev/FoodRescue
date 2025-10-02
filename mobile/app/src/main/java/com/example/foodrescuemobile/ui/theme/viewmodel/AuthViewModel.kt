package com.example.foodrescuemobile.ui.theme.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class AuthViewModel : ViewModel() {
    // Authentication state
    private val _isLoggedIn = MutableStateFlow(false)
    val isLoggedIn: StateFlow<Boolean> = _isLoggedIn.asStateFlow()

    // User data
    private val _userId = MutableStateFlow<String?>(null)
    val userId: StateFlow<String?> = _userId.asStateFlow()

    // Loading state
    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    // Error state
    private val _errorMessage = MutableStateFlow<String?>(null)
    val errorMessage: StateFlow<String?> = _errorMessage.asStateFlow()

    // User role
    private val _userRole = MutableStateFlow<String?>(null)
    val userRole: StateFlow<String?> = _userRole.asStateFlow()

    /**
     * Login user with email and password
     */
    fun login(email: String, password: String) {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                _errorMessage.value = null

                // Validate input
                if (email.isBlank() || password.isBlank()) {
                    _errorMessage.value = "Please enter email and password"
                    _isLoading.value = false
                    return@launch
                }

                // Simulate API call - replace with actual API call
                // In a real app, you would call your API here
                if (validateCredentials(email, password)) {
                    _isLoggedIn.value = true
                    _userId.value = "user_${System.currentTimeMillis()}" // Simulated user ID
                    _userRole.value = determineUserRole(email) // Simulated role
                    _errorMessage.value = null
                } else {
                    _errorMessage.value = "Invalid email or password"
                }
            } catch (e: Exception) {
                _errorMessage.value = "Login failed: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }

    /**
     * Register new user
     */
    fun register(
        name: String,
        email: String,
        password: String,
        role: String,
        phone: String?
    ) {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                _errorMessage.value = null

                // Validate input
                if (name.isBlank() || email.isBlank() || password.isBlank() || role.isBlank()) {
                    _errorMessage.value = "Please fill in all required fields"
                    _isLoading.value = false
                    return@launch
                }

                // Simulate API call - replace with actual API call
                // In a real app, you would call your API here
                if (createUser(name, email, password, role, phone)) {
                    _isLoggedIn.value = true
                    _userId.value = "user_${System.currentTimeMillis()}" // Simulated user ID
                    _userRole.value = role
                    _errorMessage.value = null
                } else {
                    _errorMessage.value = "Registration failed"
                }
            } catch (e: Exception) {
                _errorMessage.value = "Registration failed: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }

    /**
     * Logout user
     */
    fun logout() {
        viewModelScope.launch {
            try {
                // Simulate API call for logout if needed
                _isLoggedIn.value = false
                _userId.value = null
                _userRole.value = null
                _errorMessage.value = null
            } catch (e: Exception) {
                _errorMessage.value = "Logout failed: ${e.message}"
            }
        }
    }

    /**
     * Clear error message
     */
    fun clearError() {
        _errorMessage.value = null
    }

    /**
     * Simulate credential validation
     * Replace this with actual API call
     */
    private fun validateCredentials(email: String, password: String): Boolean {
        // This is a simulation - in real app, call your API
        return email.isNotEmpty() && password.isNotEmpty() && password.length >= 6
    }

    /**
     * Simulate user creation
     * Replace this with actual API call
     */
    private fun createUser(
        name: String,
        email: String,
        password: String,
        role: String,
        phone: String?
    ): Boolean {
        // This is a simulation - in real app, call your API
        return name.isNotEmpty() &&
                email.isNotEmpty() &&
                password.isNotEmpty() &&
                password.length >= 6 &&
                role.isNotEmpty()
    }

    /**
     * Determine user role based on email (simulation)
     * Replace this with actual logic
     */
    private fun determineUserRole(email: String): String {
        return when {
            email.contains("ngo") || email.contains("organization") -> "ngo"
            email.contains("volunteer") -> "volunteer"
            else -> "donor"
        }
    }
}
