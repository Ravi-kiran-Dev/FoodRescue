package com.example.foodrescuemobile.ui.theme.screens

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import com.example.foodrescuemobile.MainActivity
import org.junit.Rule
import org.junit.Test

class LoginScreenTest {

    @get:Rule
    val composeTestRule = createAndroidComposeRule<MainActivity>()

    @Test
    fun loginScreen_showsTitleAndFields() {
        composeTestRule.onNodeWithText("FoodRescue Connect").assertIsDisplayed()
        composeTestRule.onNodeWithText("Email").assertIsDisplayed()
        composeTestRule.onNodeWithText("Password").assertIsDisplayed()
    }

    @Test
    fun loginScreen_showsErrorWhenCredentialsInvalid() {
        composeTestRule.onNodeWithText("Email").performTextInput("invalid")
        composeTestRule.onNodeWithText("Password").performTextInput("wrong")
        composeTestRule.onNodeWithText("Login").performClick()

        // Assert error message is shown
        composeTestRule.waitUntil(timeoutMillis = 5000) {
            composeTestRule.onAllNodesWithText("Invalid credentials").fetchSemanticsNodes().isNotEmpty()
        }
    }
}