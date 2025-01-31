const express = require('express');
const jwt = require('jsonwebtoken'); // Import the jwt module
const router = express.Router();
const Transaction = require('../models/transaction');

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization'); 

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format. Expected "Bearer <token>"' });
  }

  const token = tokenParts[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};


// Add a Transaction
router.post('/transactions-summary', verifyToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Fetch Transactions for Logged-in User within given dates
    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    // **Classify by Credit vs Debit**
    const creditTransactions = transactions.filter(t => t.transactionType === 'credit');
    const debitTransactions = transactions.filter(t => t.transactionType === 'debit');

    // **Classify by Category**
    const categorySummary = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    res.status(200).json({
      totalCredit: creditTransactions.reduce((sum, t) => sum + t.amount, 0),
      totalDebit: debitTransactions.reduce((sum, t) => sum + t.amount, 0),
      categorySummary,
    });

  } catch (error) {
    console.error('Error fetching transactions summary:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/add', verifyToken, async (req, res) => {
  try {
    const { transactionType, category, amount, date, notes } = req.body;

    // Create a new transaction
    const transaction = new Transaction({
      userId: req.user.id, // Retrieved from token
      transactionType,
      category,
      amount,
      date,
      notes,
    });

    // Save transaction to database
    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (error) {
    console.error('Error adding transaction:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
// Delete a transaction
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Ensure user can only delete their own transactions
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this transaction' });
    }

    await transaction.deleteOne(); // Delete the transaction
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/taxSummary', verifyToken, async (req, res) => {
  try {
    const { month, year } = req.query;

    // Convert month & year to a date range
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Fetch income (credit) transactions within the selected month
    const incomeTransactions = await Transaction.find({
      userId: req.user.id,
      transactionType: 'credit',
      date: { $gte: startDate, $lte: endDate }
    });

    // Sum up all income
    const totalIncome = incomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    res.status(200).json({ totalIncome });
  } catch (error) {
    console.error('Error fetching tax summary:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// View All Transactions for the Logged-In User
router.get('/totalBalance', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });

    let sum = 0;
    for (let transaction of transactions) { // 🔥 Use "for...of" instead of "for...in"
      if (transaction.transactionType === 'credit') {
        sum += transaction.amount;
      } else if (transaction.transactionType === 'debit') {
        sum -= transaction.amount;
      }
    }

    res.status(200).json({ balance: sum }); // 🔥 Return balance as an object
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/view', verifyToken, async (req, res) => {
  try {
    // Fetch all transactions for the current user
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }); // Sorted by latest date
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
