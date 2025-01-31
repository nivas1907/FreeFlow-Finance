const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Link to the user who created the transaction
    ref: 'User',
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['credit', 'debit'], // Restrict to credit or debit
    required: true,
  },
  category: {
    type: String,
    enum: [
      // **Income Categories**
      'clientPayments',
      'royalties',
      'affiliateEarnings',
      'freelancePlatforms',
      'passiveIncome',

      // **Expense Categories**
      'softwareSubscriptions',
      'marketing',
      'officeSupplies',
      'internetPhone',
      'education',
      'transportation',
      'coWorkingSpace',
      'freelancePlatformFees',
      'websiteHosting',
      'businessMeals',
      'taxAccounting',
      'insuranceLegal',
      'miscellaneous',
    ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensure the amount is not negative
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    trim: true, // Remove extra spaces
    maxlength: 500, // Limit the length of notes
  },
});

// **Ensure transactions are indexed for faster queries**
transactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
