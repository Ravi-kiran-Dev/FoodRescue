package com.example.foodrescuemobile.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")

class PreferencesRepository(private val context: Context) {
    companion object {
        val DARK_THEME = booleanPreferencesKey("dark_theme")
        val USER_TOKEN = stringPreferencesKey("user_token")
        val USER_DATA = stringPreferencesKey("user_data")
    }

    val darkThemeFlow: Flow<Boolean> = context.dataStore.data
        .map { preferences ->
            preferences[DARK_THEME] ?: false
        }

    val userTokenFlow: Flow<String?> = context.dataStore.data
        .map { preferences ->
            preferences[USER_TOKEN]
        }

    suspend fun setDarkTheme(darkTheme: Boolean) {
        context.dataStore.edit { preferences ->
            preferences[DARK_THEME] = darkTheme
        }
    }

    suspend fun saveUserToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_TOKEN] = token
        }
    }

    suspend fun saveUserData(userData: String) {
        context.dataStore.edit { preferences ->
            preferences[USER_DATA] = userData
        }
    }

    suspend fun clearUserData() {
        context.dataStore.edit { preferences ->
            preferences.remove(USER_TOKEN)
            preferences.remove(USER_DATA)
        }
    }
}