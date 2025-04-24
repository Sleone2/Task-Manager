package com.expensetracker.controller;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ExpenseRepository expenseRepository;

    @BeforeEach
    public void setup() {
        // Clear the database before each test
        expenseRepository.deleteAll();
        // Register JavaTimeModule for LocalDateTime serialization
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    public void testCreateExpense() throws Exception {
        // Create a test expense
        Expense expense = new Expense();
        expense.setDescription("Test Expense");
        expense.setAmount(100.0);
        expense.setCategory("Test");
        expense.setDate(LocalDateTime.now());
        expense.setType("expense");

        // Convert expense to JSON
        String expenseJson = objectMapper.writeValueAsString(expense);

        // Test creating an expense
        mockMvc.perform(post("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(expenseJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.description", is("Test Expense")))
                .andExpect(jsonPath("$.amount", is(100.0)))
                .andExpect(jsonPath("$.category", is("Test")))
                .andExpect(jsonPath("$.type", is("expense")));
    }

    @Test
    public void testGetExpenses() throws Exception {
        // Create a test expense to ensure the database is not empty
        Expense expense = new Expense();
        expense.setDescription("Test Expense");
        expense.setAmount(100.0);
        expense.setCategory("Test");
        expense.setDate(LocalDateTime.now());
        expense.setType("expense");
        expenseRepository.save(expense);

        // Test getting all expenses
        mockMvc.perform(get("/api/expenses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].description", is("Test Expense")))
                .andExpect(jsonPath("$[0].amount", is(100.0)))
                .andExpect(jsonPath("$[0].category", is("Test")))
                .andExpect(jsonPath("$[0].type", is("expense")));
    }

    @Test
    public void testEditExpense() throws Exception {
        // Create a test expense to edit
        Expense expense = new Expense();
        expense.setDescription("Original Expense");
        expense.setAmount(50.0);
        expense.setCategory("Original");
        expense.setDate(LocalDateTime.now());
        expense.setType("expense");
        expense = expenseRepository.save(expense);

        // Update the expense details
        expense.setDescription("Updated Expense");
        expense.setAmount(75.0);
        expense.setCategory("Updated");

        // Convert updated expense to JSON
        String updatedExpenseJson = objectMapper.writeValueAsString(expense);

        // Test editing the expense
        mockMvc.perform(put("/api/expenses/" + expense.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedExpenseJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description", is("Updated Expense")))
                .andExpect(jsonPath("$.amount", is(75.0)))
                .andExpect(jsonPath("$.category", is("Updated")));
    }

    @Test
    public void testDeleteExpense() throws Exception {
        // Create a test expense to delete
        Expense expense = new Expense();
        expense.setDescription("Expense to Delete");
        expense.setAmount(30.0);
        expense.setCategory("Delete");
        expense.setDate(LocalDateTime.now());
        expense.setType("expense");
        expense = expenseRepository.save(expense);

        // Updated the test to expect a 204 status code instead of 200
        mockMvc.perform(delete("/api/expenses/" + expense.getId()))
                .andExpect(status().isNoContent()); // Changed from isOk() to isNoContent()

        // Verify the expense is deleted
        mockMvc.perform(get("/api/expenses/" + expense.getId()))
                .andExpect(status().isNotFound());
    }
}